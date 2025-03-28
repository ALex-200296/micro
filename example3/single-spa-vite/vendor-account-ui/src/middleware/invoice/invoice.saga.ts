import { api, safe } from '@middleware/root.data';
import { createAction } from '@reduxjs/toolkit';
import { http } from '@shared/lib/services';;
import { setOrderInvoiceBoxes } from '@app/store/orders/orders.slice';
import { addPendingRequestId, removePendingRequestId, setNotification } from '@app/store/ui/ui.slice';
import { paramsGenerator } from '@shared/lib/utils/helpers/paramsGenerator.helpers';
import { AxiosResponse } from 'axios';
import { createEasyWebWorker } from 'easy-web-worker';
import { call, put, takeEvery } from 'redux-saga/effects';

import { adapterInvoiceWebWorker } from './adapterInvoiceWebWorker/adapterInvoiceWebWorker';
import {
  actionTypeForInvoice,
  actionTypeForInvoiceBody,
  actionTypeForInvoices,
  blobConfig,
  getInvoiceBody,
} from './invoice.data';
import {
  AdapterInvoiceBoxesReturnType,
  IGetInvoiceAction,
  IGetInvoiceBodyAction,
  IGetInvoiceBodySaga,
  IGetInvoiceBoxesAction,
  IGetInvoiceBoxesSaga,
  IGetInvoicesAction,
  IGetInvoiceSaga,
  IGetInvoicesSaga,
  InvoiceProcedure,
  IPostInvoiceAction,
  IPostInvoiceSaga,
  IPrintInvoiceSaga,
  IResponseGetInvoice,
  IResponseGetInvoiceBody,
  IResponseGetInvoiceBoxes,
  IResponseGetInvoices,
  IResponsePostInvoice,
  IResponsePrintSaga,
  IReturnAdapterInvoice,
  IReturnAdapterInvoiceBody,
  IReturnAdapterInvoices,
  IUpdateInvoiceBodyAction,
  IUpdateInvoiceBodySaga,
} from './invoice.types';

export const getInvoicesActionType = '/get/invoices';
export const getInvoiceActionType = '/get/invoice';
export const getInvoiceBodyActionType = '/get/invoice/body';
export const getInvoiceBoxesActionType = '/get/invoice/boxes';
export const postInvoiceActionType = '/post/invoice';
export const updateInvoiceBodyActionType = '/update/invoice';
export const printInvoiceActionType = '/post/invoice/print';

const worker = createEasyWebWorker(adapterInvoiceWebWorker);

function* invoicesGetSaga({ payload }: IGetInvoicesSaga) {
  const { startDate, endDate, status, sord, sidx, page, rows, orderCode, type, group, sliceName } = payload;
  yield put(addPendingRequestId(getInvoicesActionType));

  const params = paramsGenerator([
    ['d1', startDate],
    ['d2', endDate],
    ['status', status],
    ['usr-inv-num', orderCode],
    ['sord', sord],
    ['sidx', sidx],
    ['page', page],
    ['rows', rows],
    ['type', type],
    ['group', group],
  ]);
  const response: AxiosResponse<IResponseGetInvoices> = yield call(() =>
    http().get<IResponseGetInvoices>(`${api}/invoice`, { params }),
  );
  if (response?.data?.data) {
    const { rows, records } = response.data.data;
    const adaptedPayload: IReturnAdapterInvoices = yield worker.sendToMethod('invoices', { rows, records });
    yield put({ type: actionTypeForInvoices[sliceName], payload: adaptedPayload });
  }
  yield put(removePendingRequestId(getInvoicesActionType));
}

function* invoiceGetSaga({ payload }: IGetInvoiceSaga) {
  const { sliceName, id } = payload;
  const response: AxiosResponse<IResponseGetInvoice> = yield call(() =>
    http().get<IResponseGetInvoice>(`${api}/invoice/${id}`),
  );
  if (response?.data) {
    const adaptedInvoice: IReturnAdapterInvoice = yield worker.sendToMethod('invoice', response?.data);
    yield put({ type: actionTypeForInvoice[sliceName], payload: { id, invoice: adaptedInvoice } });
  }
}

function* invoiceBodyGetSaga({ payload }: IGetInvoiceBodySaga) {
  const { id, sliceName } = payload;
  yield put(addPendingRequestId(`${getInvoiceBodyActionType}/${id}`));
  const response: AxiosResponse<IResponseGetInvoiceBody> = yield call(() =>
    http().get<IResponseGetInvoiceBody>(`${api}/invoice/${id}/body`),
  );
  if (response?.data?.data) {
    const { rows, volume, weight, invnum } = response.data.data;
    const adaptedRows: IReturnAdapterInvoiceBody[] = yield worker.sendToMethod('invoiceBody', rows);

    yield put({
      type: actionTypeForInvoiceBody[sliceName],
      payload: { id, rows: adaptedRows, volume, weight, docNum: invnum },
    });
  }
  yield put(removePendingRequestId(`${getInvoiceBodyActionType}/${id}`));
}

function* invoicePostSaga({ payload }: IPostInvoiceSaga) {
  const { id, proc, body, datalist, email } = payload;
  const invoiceBody = getInvoiceBody(body, proc, datalist, email);
  yield put(addPendingRequestId(`${postInvoiceActionType}/${id}`));
  const response: AxiosResponse<IResponsePostInvoice> = yield call(() =>
    http().post<IResponsePostInvoice>(`${api}/invoice/${id}/run/${proc}`, invoiceBody),
  );
  if (response?.data?.status) {
    const { message } = response.data.status;
    yield put(setNotification({ message: { title: message }, variant: 'success' }));
  }
  yield put(removePendingRequestId(`${postInvoiceActionType}/${id}`));
}

function* invoicePrintSaga({ payload }: IPrintInvoiceSaga) {
  const { id, proc, action } = payload;
  yield put(addPendingRequestId(`${printInvoiceActionType}/${id}`));
  const response: AxiosResponse<Blob | IResponsePrintSaga> = yield call(() =>
    http().post<IResponsePrintSaga>(
      `${api}/invoice/${id}/print/${proc}`,
      ...(proc === InvoiceProcedure.downloadUPD ? blobConfig : []),
    ),
  );
  if (response) yield action?.(response);
  yield put(removePendingRequestId(`${printInvoiceActionType}/${id}`));
}

function* invoiceUpdateBodySaga({ payload }: IUpdateInvoiceBodySaga) {
  const { post, getInvoice, getInvoices, action } = payload;
  yield call(() => invoicePostSaga({ payload: post, type: postInvoiceActionType }));
  if (getInvoice) yield call(() => invoiceBodyGetSaga({ payload: getInvoice, type: getInvoiceActionType }));
  if (getInvoices) yield call(() => invoicesGetSaga({ payload: getInvoices, type: getInvoicesActionType }));
  yield action?.();
}

function* invoiceBoxesGetSaga({ payload }: IGetInvoiceBoxesSaga) {
  const { id } = payload;
  yield put(addPendingRequestId(getInvoiceBoxesActionType));
  const response: AxiosResponse<IResponseGetInvoiceBoxes> = yield call(() => http().get(`${api}/invoice/${id}/boxes`));
  if (response?.data) {
    const adaptedInvoiceBoxesInfo: AdapterInvoiceBoxesReturnType = yield worker.sendToMethod(
      'invoiceBoxes',
      response.data.boxes,
    );

    yield put(setOrderInvoiceBoxes(adaptedInvoiceBoxesInfo));
  }
  yield put(removePendingRequestId(getInvoiceBoxesActionType));
}

export const getInvoicesAction = createAction<IGetInvoicesAction>(getInvoicesActionType);
export const getInvoiceAction = createAction<IGetInvoiceAction>(getInvoiceActionType);
export const getInvoiceBodyAction = createAction<IGetInvoiceBodyAction>(getInvoiceBodyActionType);
export const getInvoiceBoxesAction = createAction<IGetInvoiceBoxesAction>(getInvoiceBoxesActionType);
export const postInvoiceAction = createAction<IPostInvoiceAction>(postInvoiceActionType);
export const updateInvoiceBodyAction = createAction<IUpdateInvoiceBodyAction>(updateInvoiceBodyActionType);
export const postInvoicePrintAction =
  createAction<Pick<IPostInvoiceAction, 'id' | 'proc' | 'action'>>(printInvoiceActionType);

export function* invoicesSaga() {
  yield takeEvery(getInvoicesAction.type, safe(invoicesGetSaga));
  yield takeEvery(getInvoiceAction.type, safe(invoiceGetSaga));
  yield takeEvery(getInvoiceBodyAction.type, safe(invoiceBodyGetSaga));
  yield takeEvery(postInvoiceAction.type, safe(invoicePostSaga));
  yield takeEvery(updateInvoiceBodyAction.type, safe(invoiceUpdateBodySaga));
  yield takeEvery(postInvoicePrintAction.type, safe(invoicePrintSaga));
  yield takeEvery(getInvoiceBoxesAction.type, safe(invoiceBoxesGetSaga));
}
