import { Routes } from '@app/routes/root.types';
import { addPendingRequestId, removePendingRequestId } from '@app/store/ui/ui.slice';
import {
  setContracts,
  setError,
  setRights,
  setUser,
  setVendorClients,
  userSliceName,
} from '@app/store/user/user.slice';
import { IVendorClientInfo } from '@app/store/user/user.types';
import { api, globalHandlerError, resetStoreAction, safe } from '@middleware/root.data';
import { createAction } from '@reduxjs/toolkit';
import { http, ResponseError } from '@shared/lib/services';
import { cacheRules } from '@shared/lib/utils/helpers/cache';
import { formDataGenerator } from '@shared/lib/utils/helpers/formDataGenerator.helpers';
import { AxiosError, AxiosResponse } from 'axios';
import { createEasyWebWorker } from 'easy-web-worker';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { globalNavigate } from '../../entities/common/ui/GlobalHistory/globalHistory';

import { IAdapterUserReturnData } from './adapterUserWebWorker/adapterUser.types';
import { adapterUserWebWorker } from './adapterUserWebWorker/adapterUserWebWorker';
import {
  ILogoutUserActionState,
  ILogoutUserSagaState,
  IPostUserActionState,
  IPostUserSagaState,
  IResponseGetUserContracts,
  IResponseGetUserLogin,
  IResponseGetUserProfile,
  IResponseGetVendorClients,
  IResponsePostUserLogin,
  LoginType,
} from './user.types';

const worker = createEasyWebWorker(adapterUserWebWorker);

function* userLoginSaga({ payload }: IPostUserSagaState) {
  const { login, password, action } = payload;

  try {
    yield all([put(addPendingRequestId(userSliceName)), put(setError(false))]);
    const formData = formDataGenerator([
      ['log', login],
      ['pwd', password],
    ]);
    const user: AxiosResponse<IResponsePostUserLogin> = yield call(() =>
      http()
        .post<IResponsePostUserLogin>(`${api}/user/login`, formData)
        .catch((error) => {
          error.response.status = 401;
          throw error;
        }),
    );
    const [profile, contracts]: [AxiosResponse<IResponseGetUserProfile>, AxiosResponse<IResponseGetUserContracts>] =
      user.data.data.login_type !== LoginType.WI
        ? yield all([
            http().get<IResponseGetUserProfile>(`${api}/user/profile`),
            http().get<IResponseGetUserContracts>(`${api}/user/profile/contractsvendors`),
          ])
        : [null, null];

    const userDataForAdapter = {
      userData: user.data.data,
      profileInfo: profile?.data?.data || {},
      contractsInfo: contracts?.data?.data || {},
    };

    const { isAuth, error, userData, profileInfo, contractsInfo } = yield worker.sendToMethod(
      'userData',
      userDataForAdapter,
    );

    yield all([
      put(
        setUser({
          isAuth,
          error,
          user: userData,
          userProfile: profileInfo,
        }),
      ),
      put(setContracts(contractsInfo)),
      put(removePendingRequestId(userSliceName)),
    ]);

    yield action?.();
  } catch (error) {
    const err = error as AxiosError;
    yield err.response?.status != 401 ? all([put(setRights(null)), globalNavigate(Routes.Home)]) : put(setError(true));
    yield put(removePendingRequestId(userSliceName));
  }
}

function* userGetSaga() {
  try {
    const user: AxiosResponse<IResponseGetUserLogin> = yield call(() =>
      http().get<IResponseGetUserLogin>(`${api}/user/session/get`),
    );

    const [profile, contracts]: [AxiosResponse<IResponseGetUserProfile>, AxiosResponse<IResponseGetUserContracts>] =
      user.data.data.login_type !== LoginType.WI
        ? yield all([
            http().get<IResponseGetUserProfile>(`${api}/user/profile`),
            http().get<IResponseGetUserContracts>(`${api}/user/profile/contractsvendors`),
          ])
        : [null, null];

    const userDataForAdapter = {
      userData: user.data.data,
      profileInfo: profile?.data?.data || {},
      contractsInfo: contracts?.data?.data || {},
    };

    const adaptedUserData: IAdapterUserReturnData = yield worker.sendToMethod('userData', userDataForAdapter);
    const { isAuth, error, userData, profileInfo, contractsInfo } = adaptedUserData;

    yield all([
      put(
        setUser({
          isAuth,
          error,
          user: userData,
          userProfile: profileInfo,
        }),
      ),
      put(setContracts(contractsInfo)),
    ]);
  } catch (err: unknown) {
    const error = err as ResponseError;
    yield put(setRights(null));
    yield globalHandlerError(error);
  }
}

function* userLogoutSaga({ payload }: ILogoutUserSagaState) {
  const { navigate } = payload;
  yield call(() => http().post(`${api}/user/logout`));
  yield all([cacheRules.clear(), navigate(`/${Routes.Login}`), put(resetStoreAction)]);
}

function* userVendorClientsSaga() {
  yield put(addPendingRequestId(`${userSliceName}/VendorClients`));
  const response: AxiosResponse<IResponseGetVendorClients> = yield call(() =>
    http().get<IResponseGetVendorClients>(`${api}/user/VendorClients`),
  );
  const { rows } = response.data.data;
  if (rows) {
    const adaptedVendorClients: IVendorClientInfo[] = yield worker.sendToMethod('vendorClients', rows);
    yield put(setVendorClients(adaptedVendorClients));
  }
  yield put(removePendingRequestId(`${userSliceName}/VendorClients`));
}

export const getUserAction = createAction(`${userSliceName}/login/get`);
export const postUserAction = createAction<IPostUserActionState>(`${userSliceName}/login/post`);
export const logoutUserAction = createAction<ILogoutUserActionState>(`${userSliceName}/logout`);
export const getVendorClientsAction = createAction(`${userSliceName}/vendorClients`);

export function* userSaga() {
  yield takeEvery(getUserAction.type, userGetSaga);
  yield takeEvery(postUserAction.type, userLoginSaga);
  yield takeEvery(logoutUserAction.type, safe(userLogoutSaga));
  yield takeEvery(getVendorClientsAction.type, safe(userVendorClientsSaga));
}
