import { getCookie } from 'react-use-cookie';
import {
  catalogSliceName,
  setCatalogConfigChars,
  setCharacteristicReports,
  setGoodsList,
  setGoodsListFilters,
  setGoodsListStatus,
  setUnpublishedFiles,
} from '@app/store/catalog/catalog.slice';
import { ICatalogState, ICatalogTableItems, NoIndexChecks } from '@app/store/catalog/catalog.types';
import { addPendingRequestId, removePendingRequestId, setNotification } from '@app/store/ui/ui.slice';
import { api, safe } from '@middleware/root.data';
import { createAction } from '@reduxjs/toolkit';
import { downloadFilesFuncWithInterval, formDataGenerator, paramsGenerator } from '@shared/lib';
import { http } from '@shared/lib/services';
import { AxiosResponse } from 'axios';
import { createEasyWebWorker } from 'easy-web-worker';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { adapterCatalogWebWorker } from './adapterCatalogWebWorker/adapterCatalogWebWorker';
import {
  IAdaptedGoodsFilesData,
  ICatalogConfigCharsResponse,
  IGetCatalogSagaState,
  IGetConfigCharsAction,
  IGetGoodsFilesAction,
  IGetGoodsFilesActionPayload,
  IGetGoodsFilesResponse,
  IGoodsListActionState,
  IPostReportsActionState,
  IPostReportsSagaState,
  IResponseGetFile,
  IResponseGetGoodsList,
  IRSupplierResponse,
  NoIndexValues,
  ObfCategories,
} from './catalog.types';

const worker = createEasyWebWorker(adapterCatalogWebWorker);

function* getGoodsListFilesSaga() {
  const params = paramsGenerator([['obf_category', ObfCategories.goodsList]]);
  yield put(addPendingRequestId(getGoodsListFilesAction.type));

  const response: AxiosResponse<IGetGoodsFilesResponse> = yield call(() =>
    http().get<IRSupplierResponse>(`${api}/file/ob_file/r_supplier`, { params }),
  );

  if (response?.data?.data) {
    const { rows, records } = response.data.data;
    const linksArr = rows.map((row) => row.url);

    yield !records
      ? put(setNotification({ code: 404, message: { title: 'Файл не найден' } }))
      : downloadFilesFuncWithInterval(linksArr, 500);
  }
  yield put(removePendingRequestId(getGoodsListFilesAction.type));
}

function* getRxReportsFilesSaga({ payload }: IGetGoodsFilesAction) {
  const { page, rows } = payload;
  const params = paramsGenerator([
    ['obf_category', ObfCategories.rxReports],
    ['page', page],
    ['rows', rows],
  ]);
  yield put(addPendingRequestId(getRxReportsFilesAction.type));

  const response: AxiosResponse<IGetGoodsFilesResponse> = yield call(() =>
    http().get<IRSupplierResponse>(`${api}/file/ob_file/r_supplier`, { params }),
  );

  if (response?.data?.data) {
    const adaptedData: IRSupplierResponse = yield worker.sendToMethod('filesData', response.data.data);
    yield put(setCharacteristicReports(adaptedData));
  }
  yield put(removePendingRequestId(getRxReportsFilesAction.type));
}

function* getUnpubReportsFilesSaga({ payload }: IGetGoodsFilesAction) {
  const { page, rows } = payload;
  const params = paramsGenerator([
    ['obf_category', ObfCategories.unpubReports],
    ['page', page],
    ['rows', rows],
  ]);

  yield put(addPendingRequestId(getUnpubReportsFilesAction.type));
  const response: AxiosResponse<IGetGoodsFilesResponse> = yield call(() =>
    http().get<IRSupplierResponse>(`${api}/file/ob_file/r_supplier`, { params }),
  );

  if (response?.data?.data) {
    const data = response.data.data;
    const adaptedData: IAdaptedGoodsFilesData = yield worker.sendToMethod('unpublishedGoods', data);

    yield put(setUnpublishedFiles(adaptedData));
  }
  yield put(removePendingRequestId(getUnpubReportsFilesAction.type));
}

function* setCharacteristicsFileStatus({ payload }: IPostReportsSagaState) {
  const { name, dir } = payload;
  const data = formDataGenerator([
    ['name', name],
    ['dir', dir],
  ]);
  const sId = getCookie('session-id');
  const response: AxiosResponse<IResponseGetFile> = yield call(() =>
    http().post<IResponseGetFile>(`/api/files/${sId}`, data),
  );
  void response;
}

function* goodsListSaga({ payload }: IGetCatalogSagaState) {
  const { noIndex, page, rows, sort, sortValue, manufacturer, listStatus, series, category, brand, name, article } =
    payload;

  if (listStatus === NoIndexChecks.notChecked && !noIndex) {
    yield put(setGoodsListFilters({ noIndex: true }));
    return;
  }
  yield put(addPendingRequestId(getGoodsListAction.type));

  const sidxValue = sortValue ? sort : '';
  const seriesLine = series.length ? '989$' + series.join('^989$') : '';
  const brandsLine = brand.length ? '82$' + brand.join('^82$') : '';
  const improve = article ? 'number_article ' : '';
  const noIndexValue = noIndex ? NoIndexValues.unpublished : NoIndexValues.all;

  const params = paramsGenerator([
    ['asSupplier', true],
    ['noindex', noIndexValue],
    ['page', page],
    ['rows', rows],
    ['sidx', sidxValue],
    ['sord', sortValue],
    ['cls', category],
    ['conf', seriesLine || brandsLine],
    ['val', name || article],
    ['improve', improve],
    ['mnf', manufacturer],
  ]);

  const response: AxiosResponse<IResponseGetGoodsList> = yield call(() =>
    http().get<IResponseGetGoodsList>(`${api}/catalog`, { params }),
  );

  if (response?.data?.data) {
    const { rows, records } = response.data.data;
    if (listStatus === NoIndexChecks.notChecked && noIndex) {
      if (records) {
        yield put(setGoodsListStatus(NoIndexChecks.hasUnpublished));
      } else {
        yield all([put(setGoodsListStatus(NoIndexChecks.noUnpublished)), put(setGoodsListFilters({ noIndex: false }))]);
        return;
      }
    }
    //TODO: проверить
    const adaptedRows: ICatalogTableItems[] = yield worker.sendToMethod('goodsListAdapter', rows);
    yield put(setGoodsList({ rows: adaptedRows, records }));
  }
  yield put(removePendingRequestId(getGoodsListAction.type));
}

function* getCatalogConfigCharsSaga({ payload }: IGetConfigCharsAction) {
  const { classCode, manufacturerCode, pars = [] } = payload;
  const val = manufacturerCode ? `mnf${manufacturerCode}` : '';
  const concatPars = pars.join(',');
  const params = paramsGenerator([
    ['class', classCode],
    ['val', val],
    ['pars', concatPars],
  ]);
  yield put(addPendingRequestId(getCatalogConfigCharsAction.type));
  const response: AxiosResponse<ICatalogConfigCharsResponse> = yield call(() =>
    http().get<ICatalogConfigCharsResponse>(`${api}/catalog/configurator/chars`, { params }),
  );
  if (response?.data?.data) {
    const { ConfigChars } = response.data.data;
    const data: ICatalogState['configChars'] = yield worker.sendToMethod('configChars', ConfigChars);
    yield put(setCatalogConfigChars(data));
  }
  yield put(removePendingRequestId(getCatalogConfigCharsAction.type));
}

export const getCharacteristicsFilesAction = createAction(`${catalogSliceName}/get/files/characteristics`);
export const setCharacteristicsFileStatusAction = createAction<IPostReportsActionState>(
  `${catalogSliceName}/post/files/characteristicsStatus`,
);
export const getGoodsListAction = createAction<IGoodsListActionState>(`${catalogSliceName}/goodsList`);
export const getGoodsListFilesAction = createAction(`${catalogSliceName}/get/goodsListFiles`);
export const getRxReportsFilesAction = createAction<IGetGoodsFilesActionPayload>(
  `${catalogSliceName}/get/rxReportsFiles`,
);
export const getUnpubReportsFilesAction = createAction<IGetGoodsFilesActionPayload>(
  `${catalogSliceName}/get/unpubReportsFiles`,
);
export const getCatalogConfigCharsAction = createAction<IGetConfigCharsAction['payload']>(
  `${catalogSliceName}/categories`,
);

export function* catalogSaga() {
  yield takeEvery(setCharacteristicsFileStatusAction.type, safe(setCharacteristicsFileStatus));
  yield takeEvery(getCatalogConfigCharsAction.type, safe(getCatalogConfigCharsSaga));
  yield takeEvery(getUnpubReportsFilesAction.type, safe(getUnpubReportsFilesSaga));
  yield takeEvery(getGoodsListFilesAction.type, safe(getGoodsListFilesSaga));
  yield takeEvery(getRxReportsFilesAction.type, safe(getRxReportsFilesSaga));
  yield takeEvery(getGoodsListAction.type, safe(goodsListSaga));
}
