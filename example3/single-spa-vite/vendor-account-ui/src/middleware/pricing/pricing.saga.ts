import { api, safe } from '@middleware/root.data';
import { createAction } from '@reduxjs/toolkit';
import { http } from '@shared/lib/services';;
import { addPendingRequestId, removePendingRequestId } from '@app/store/ui/ui.slice';
import { downloadFilesFuncWithInterval } from '@shared/lib/utils/helpers/download.helpers';
import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { IClientData, IGetPriceListsSagaState, IResponseGetPriceData } from './pricing.types';

export const getJobPriceListsActionType = 'reports/get/job/priceLists';

function* getPriceListSaga({ payload }: IGetPriceListsSagaState) {
  yield put(addPendingRequestId(`${getJobPriceListsActionType}`));
  const params = { client: payload };
  const response: AxiosResponse<IResponseGetPriceData> = yield call(() =>
    http().get<IResponseGetPriceData>(`${api}/sp/cli_price`, { params }),
  );

  if (response?.data?.data) {
    const { clients } = response.data.data;
    const noErrorClients = clients?.filter((client) => !client.error && !!client.url);
    if (noErrorClients?.length)
      yield downloadFilesFuncWithInterval(
        noErrorClients.map((client: IClientData) => client.url),
        300,
      );
  }
  yield put(removePendingRequestId(`${getJobPriceListsActionType}`));
}

export const getPriceListAction = createAction<string>(`${getJobPriceListsActionType}`);

export function* pricingSaga() {
  yield takeEvery(getPriceListAction.type, safe(getPriceListSaga));
}
