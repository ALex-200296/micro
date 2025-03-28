import { api, safe } from '@middleware/root.data';
import { createAction } from '@reduxjs/toolkit';
import { http } from '@shared/lib/services';;
import { financeSliceName, setReconciliationData } from '@app/store/finance/finance.slice';
import { addPendingRequestId, removePendingRequestId, setNotification } from '@app/store/ui/ui.slice';
import { paramsGenerator } from '@shared/lib/utils/helpers/paramsGenerator.helpers';
import { AxiosResponse } from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
  IGetFinanceClientsActActionState,
  IGetFinanceClientsActSagaState,
  IPostFinanceClientsAct,
  IPostFinanceClientsActSagaState,
  IResponseGetFinanceClientsAct,
  IResponsePostFinanceClientsAct,
  IUpdateFinanceClientsAct,
  IUpdateFinanceClientsActSagaState,
} from './finance.types';

export const getFinanceClientsActType: string = `${financeSliceName}/get/cliect/act`;
export const postFinanceClientActType: string = `${financeSliceName}/post/cliect/act`;
export const updateFinanceClientActType: string = `${financeSliceName}/update/cliect/act`;

export const getFinanceClientsAct = createAction<IGetFinanceClientsActActionState>(getFinanceClientsActType);
export const postFinanceClientsAct = createAction<IPostFinanceClientsAct>(postFinanceClientActType);
export const updateFinanceClientAct = createAction<IUpdateFinanceClientsAct>(updateFinanceClientActType);

function* financeClientsActGetSaga({ payload }: IGetFinanceClientsActSagaState) {
  const { organizationCode, startDate, endDate } = payload;
  const params = paramsGenerator([
    ['OrganizationCode', organizationCode],
    ['StartDate', startDate],
    ['EndDate', endDate],
  ]);
  yield put(addPendingRequestId(getFinanceClientsActType));
  const response: AxiosResponse<IResponseGetFinanceClientsAct> = yield call(() =>
    http().get<IResponseGetFinanceClientsAct>(`${api}/client/act`, { params }),
  );

  if (response?.data?.Data) {
    const { Data } = response.data;
    const records = Data.length;
    yield put(setReconciliationData({ data: Data, records }));
  }
  yield put(removePendingRequestId(getFinanceClientsActType));
}

function* financeClientsActPostSaga({ payload }: IPostFinanceClientsActSagaState) {
  const { organizationCode, startDate, endDate } = payload;
  const params = paramsGenerator([
    ['OrganizationCode', organizationCode],
    ['StartDate', startDate],
    ['EndDate', endDate],
  ]);
  yield put(addPendingRequestId(postFinanceClientActType));
  const response: AxiosResponse<IResponsePostFinanceClientsAct> = yield call(() =>
    http().post<IResponsePostFinanceClientsAct>(`${api}/client/act`, null, { params }),
  );
  void response;

  yield all([
    put(setNotification({ message: { title: 'Акт сверки создан' }, variant: 'success' })),
    put(removePendingRequestId(postFinanceClientActType)),
  ]);
}

function* financeClientsActUpdateSaga({ payload }: IUpdateFinanceClientsActSagaState) {
  const { post, get } = payload;
  yield call(() => financeClientsActPostSaga({ payload: post, type: postFinanceClientActType }));
  yield call(() => financeClientsActGetSaga({ payload: get, type: getFinanceClientsActType }));
}

export function* financeSaga() {
  yield takeEvery(getFinanceClientsAct.type, safe(financeClientsActGetSaga));
  yield takeEvery(postFinanceClientsAct.type, safe(financeClientsActPostSaga));
  yield takeEvery(updateFinanceClientAct.type, safe(financeClientsActUpdateSaga));
}
