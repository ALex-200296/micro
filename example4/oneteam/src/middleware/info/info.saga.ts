
import { api, safe } from '@middleware/root.data';
import { createAction } from '@reduxjs/toolkit';
import { http } from '@shared/lib/services';;
import {
  infoSliceName,
  setInfoCladrAddressList,
  setInfoClass,
  setInfoClient,
  setInfoParams,
  setInfoSearchData,
  setInfoSesSearchData,
} from '@app/store/info/info.slice';
import { IInfoClientListElem, ITreeInfoParams, TypeInfoSearch } from '@app/store/info/info.types';
import { addPendingRequestId, removePendingRequestId, setNotification } from '@app/store/ui/ui.slice';
import { paramsGenerator } from '@shared/lib/utils/helpers/paramsGenerator.helpers';
import { AxiosResponse } from 'axios';
import { createEasyWebWorker } from 'easy-web-worker';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { adapterInfoWebWorker } from './adapterInfoWebWorker/adapterInfoWebWorker';
import { getCode, getInfoClassPendingRequestId, getInfoSearchPendingRequestId, infoSearchKeyToTerm } from './info.data';
import {
  ICladrSagaPayload,
  ICladrSagaState,
  IGetInfoClassSagaState,
  IGetInfoClientSagaState,
  IGetInfoParamsSagaState,
  IGetInfoSearchSagaState,
  IGetInfoSesSearchSagaState,
  IInfoClassActionState,
  IInfoClientActionState,
  IInfoParamsActionState,
  IInfoSearchSagaPayload,
  IInfoSesSearchSagaPayload,
  IResponseGetCladr,
  IResponseGetInfoClass,
  IResponseGetInfoClient,
  IResponseGetInfoParams,
  IResponseGetInfoSearch,
  IResponseGetInfoSesSearch,
} from './info.types';

const worker = createEasyWebWorker(adapterInfoWebWorker);

function* infoCladrSaga({ payload }: ICladrSagaState) {
  yield put(addPendingRequestId(`${infoSliceName}/cladr`));
  const { code, term, matches, clicode } = payload;
  const params = paramsGenerator([
    ['code', code],
    ['term', term],
    ['matches', matches],
    ['clicode', clicode],
  ]);
  const response: AxiosResponse<IResponseGetCladr> = yield call(() => http().get(`${api}/info/cladr`, { params }));
  if (response?.data.data) {
    yield all([
      put(setInfoCladrAddressList(response.data.data)),
      put(removePendingRequestId(`${infoSliceName}/cladr`)),
    ]);
  }
}

function* infoSearchSaga({ payload }: IGetInfoSearchSagaState) {
  const { len, lenLim, term, code, type, cli, message, cyrillicComplexTerm } = payload;
  const requestId = getInfoSearchPendingRequestId(type, code, term);
  yield put(addPendingRequestId(requestId));
  const params = paramsGenerator([
    ['term', term ? infoSearchKeyToTerm[term] : cyrillicComplexTerm],
    ['len', len],
    ['len_lim', lenLim],
    ['cli', cli],
  ]);
  const response: AxiosResponse<IResponseGetInfoSearch> = yield call(() =>
    http().get<IResponseGetInfoSearch>(`${api}/info/search/${type}/${getCode(code)}`, { params }),
  );
  if (response?.data?.data) {
    const { rows } = response.data.data;
    yield put(setInfoSearchData({ type, code, data: rows, term }));
    if (type === TypeInfoSearch.main37 && !rows.length)
      yield put(
        setNotification({
          message: { title: message || response.data.status.message },
          variant: 'error',
        }),
      );
  }
  yield put(removePendingRequestId(requestId));
}

function* infoSesSearchSaga({ payload }: IGetInfoSesSearchSagaState) {
  const { type } = payload;

  const params = paramsGenerator([['asSupplier', true]]);

  yield put(addPendingRequestId(infoSesSearchAction.type));
  const response: AxiosResponse<IResponseGetInfoSesSearch> = yield call(() =>
    http().get<IResponseGetInfoSesSearch>(`${api}/info/ses_search/${type}/`, { params }),
  );
  if (response?.data?.data) {
    const { rows } = response.data.data;
    yield put(setInfoSesSearchData({ type, rows }));
  }
  yield put(removePendingRequestId(infoSesSearchAction.type));
}

function* infoParamsSaga({ payload }: IGetInfoParamsSagaState) {
  const { oper, type, group, actions } = payload;
  const params = paramsGenerator([
    ['type', type],
    ['group', group],
  ]);

  const response: AxiosResponse<IResponseGetInfoParams> = yield call(() =>
    http().get<IResponseGetInfoParams>(`${api}/info/param/${oper}`, { params }),
  );
  if (response?.data?.data) {
    const { rows } = response.data.data;
    const adaptedRows: ITreeInfoParams[] = yield worker.sendToMethod('infoParams', { items: rows });
    yield put(setInfoParams({ oper, type, group, rows: adaptedRows }));
    if (actions) {
      yield all([...actions.map(({ type, payload }) => put({ type, payload: payload(rows) }))]);
    }
  }
}

function* infoClassSaga({ payload }: IGetInfoClassSagaState) {
  const { code, city, id } = payload;
  const requestId = getInfoClassPendingRequestId(payload);
  yield put(addPendingRequestId(requestId));
  const params = paramsGenerator([
    ['id', id],
    ['city', city],
  ]);

  const response: AxiosResponse<IResponseGetInfoClass> = yield call(() =>
    http().get<IResponseGetInfoClass>(`${api}/info/class/${code}`, { params }),
  );
  if (response?.data?.data) {
    const { rows } = response.data.data;
    yield put(setInfoClass({ code, data: rows }));
  }

  yield put(removePendingRequestId(requestId));
}

function* infoClientSaga({ payload }: IGetInfoClientSagaState) {
  const { searchValue, clientCode, clientName, managerCode, inn, kpp } = payload;
  const params = paramsGenerator([
    ['search_value', searchValue],
    ['cli-code', clientCode],
    ['cli-name', clientName],
    ['Class37', managerCode],
    ['inn', inn],
    ['kpp', kpp],
  ]);

  yield put(addPendingRequestId(`${infoSliceName}/client`));
  const response: AxiosResponse<IResponseGetInfoClient> = yield call(() =>
    http().get<IResponseGetInfoClient>(`${api}/info/client`, { params }),
  );
  if (response?.data?.data) {
    const { rows } = response.data.data;
    const adaptedInfoClientData: IInfoClientListElem[] = yield worker.sendToMethod('infoClient', rows);
    yield put(setInfoClient(adaptedInfoClientData));
  }
  yield put(removePendingRequestId(`${infoSliceName}/client`));
}

export const infoCladrAction = createAction<ICladrSagaPayload>(`${infoSliceName}/get/cladr`);
export const infoSearchAction = createAction<IInfoSearchSagaPayload>(`${infoSliceName}/get/info/search`);
export const infoSesSearchAction = createAction<IInfoSesSearchSagaPayload>(`${infoSliceName}/get/info/ses_search`);
export const infoParamsAction = createAction<IInfoParamsActionState>(`${infoSliceName}/get/info/param`);
export const infoClassAction = createAction<IInfoClassActionState>(`${infoSliceName}/get/info/class`);
export const infoClientAction = createAction<IInfoClientActionState>(`${infoSliceName}/get/client`);

export function* infoSaga() {
  yield takeEvery(infoCladrAction.type, safe(infoCladrSaga));
  yield takeEvery(infoSearchAction.type, safe(infoSearchSaga));
  yield takeEvery(infoSesSearchAction.type, safe(infoSesSearchSaga));
  yield takeEvery(infoParamsAction.type, safe(infoParamsSaga));
  yield takeEvery(infoClassAction.type, safe(infoClassSaga));
  yield takeEvery(infoClientAction.type, safe(infoClientSaga));
}
