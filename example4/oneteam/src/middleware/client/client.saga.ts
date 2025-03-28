import { api, safe } from '@middleware/root.data';
import { createAction } from '@reduxjs/toolkit';
import { http } from '@shared/lib/services';;
import { addPendingRequestId, removePendingRequestId } from '@app/store/ui/ui.slice';
import { formDataGenerator } from '@shared/lib/utils/helpers/formDataGenerator.helpers';
import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import {
  IClientCreVendorContractPayload,
  IClientCreVendorContractResponse,
  IClientCreVendorContractSagaState,
  IClientDocsUploadResponse,
  IClientUploadDocsPayload,
  IClientUploadDocsSagaState,
} from './client.types';

export const postClientUploadDocsActionType = 'client/docsUpload';
export const postClientCreVendorContractType = 'client/creVendorContract';

function* clientUploadDocsSaga({ payload }: IClientUploadDocsSagaState) {
  const { cliUploadedCat, file, name, action } = payload;
  const formData = formDataGenerator([
    ['cliUploadedCat', cliUploadedCat],
    ['file', file],
    ['name', name],
  ]);
  yield put(addPendingRequestId(postClientUploadDocsActionType));
  const response: AxiosResponse<IClientDocsUploadResponse> = yield call(() =>
    http().post<IClientDocsUploadResponse>(`${api}/client/docUpload`, formData),
  );
  if (response?.data) {
    yield action?.();
  }
  yield put(removePendingRequestId(postClientUploadDocsActionType));
}

function* clientCreVendorContractSaga({ payload }: IClientCreVendorContractSagaState) {
  const { payDelay, begDate, endDate, datePriceRegulation, dateZreq, electronicArrival, action } = payload;
  const formData = formDataGenerator([
    ['pay_delay', payDelay],
    ['begdate', begDate],
    ['enddate', endDate],
    ['date_price_regulation', datePriceRegulation],
    ['date_z_req', dateZreq],
    ['electronic_arrival', electronicArrival],
  ]);
  yield put(addPendingRequestId(postClientCreVendorContractType));
  const response: AxiosResponse<IClientCreVendorContractResponse> = yield call(() =>
    http().post(`${api}/client/creVendorContract`, formData),
  );
  if (response?.data?.data) {
    yield action?.(response.data);
  }
  yield put(removePendingRequestId(postClientCreVendorContractType));
}

export const postClientDocsUploadAction = createAction<IClientUploadDocsPayload>(postClientUploadDocsActionType);
export const postClientCreVendorContractAction = createAction<IClientCreVendorContractPayload>(
  postClientCreVendorContractType,
);

export function* clientSaga() {
  yield takeEvery(postClientDocsUploadAction.type, safe(clientUploadDocsSaga));
  yield takeEvery(postClientCreVendorContractAction.type, safe(clientCreVendorContractSaga));
}
