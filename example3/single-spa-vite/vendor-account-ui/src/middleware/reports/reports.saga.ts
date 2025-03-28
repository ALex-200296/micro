import { catalogSliceName } from '@app/store/catalog/catalog.slice';
import { setUuidData } from '@app/store/factoring/factoring.slice';
import { addPendingRequestId, removePendingRequestId, setNotification } from '@app/store/ui/ui.slice';
import { api, safe } from '@middleware/root.data';
import { createAction } from '@reduxjs/toolkit';
import { http } from '@shared/lib/services';
import { paramsGenerator } from '@shared/lib/utils/helpers/paramsGenerator.helpers';
import axios, { AxiosResponse } from 'axios';
import { createEasyWebWorker } from 'easy-web-worker';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { AdapterReportsFilesReturnType, GetTaskParamsReturnType } from './adapterReportsWebWorker/adapterReports.types';
import { adapterReportsWebWorker } from './adapterReportsWebWorker/adapterReportsWebWorker';
import { getReportsActionName, reportsDirectory } from './reports.data';
import {
  IGetJobUuidActionState,
  IGetJobUuidSagaState,
  IGetReportsActionState,
  IGetReportsFilesActionState,
  IGetReportsFilesSagaState,
  IGetReportsSagaState,
  IPostTaskActionState,
  IPostTaskSagaState,
  IPostUuidActionState,
  IPostUuidSagaState,
  IResponseGetFile,
  IResponseGetJobUuid,
  IResponseGetReports,
  IResponsePostUuid,
  IUuidData,
} from './reports.types';

export const getJobUuidActionType = 'reports/get/job/uuid';

const worker = createEasyWebWorker(adapterReportsWebWorker);

function* postTaskSaga({ payload }: IPostTaskSagaState) {
  const { nameFile, type, codeNotification: code, actions, oneRequest, pExtParam } = payload;

  const adaptedParamsArray: GetTaskParamsReturnType = yield worker.sendToMethod('taskParams', {
    files: nameFile,
    oneRequest,
    pExtParam,
  });

  const response: AxiosResponse = yield call(() =>
    axios.all(adaptedParamsArray.map((params) => http().post(`${api}/job/${type}/create`, null, { params }))),
  );
  void response;

  if (code)
    yield put(
      setNotification({
        code,
        variant: 'success',
        message: { title: 'Данные успешно загружены' },
        noDublicate: true,
      }),
    );

  if (actions) {
    yield all([...actions.map(({ type, payload }) => put({ type, payload }))]);
  }
}

function* getReportsFilesSaga({ payload }: IGetReportsFilesSagaState) {
  const { date, page, rows, sidx, status, sortDate, sortStatus, type, computedProperty, sliceName } = payload;
  const requestId = `${sliceName}/${computedProperty}`;
  yield put(addPendingRequestId(requestId));
  const params = paramsGenerator([
    ['sord', sortStatus || sortDate],
    ['state', status],
    ['d1', date],
    ['page', page],
    ['rows', rows],
    ['sidx', sidx],
  ]);

  const response: AxiosResponse<IResponseGetFile> = yield call(() =>
    http().get<IResponseGetFile>(`${api}/job/${type}`, { params }),
  );

  if (response?.data?.data) {
    const adaptedData: AdapterReportsFilesReturnType = yield worker.sendToMethod('reportFiles', response?.data?.data);

    yield all([
      put({
        type: getReportsActionName(sliceName),
        payload: { ...adaptedData, computedProperty },
      }),
      put(removePendingRequestId(requestId)),
    ]);
  }
}

function* getReportsDirectorySaga({ payload }: IGetReportsSagaState) {
  const { currDirCrRep, sliceName, computedProperty } = payload;
  const requestId = computedProperty ? `${sliceName}/${computedProperty}` : sliceName;
  yield put(addPendingRequestId(requestId));
  const params = paramsGenerator([['CurrDirCrRep', currDirCrRep]]);
  const response: AxiosResponse<IResponseGetReports> = yield call(() =>
    http().get<IResponseGetReports>(`${api}/job/reports`, { params }),
  );
  if (response?.data?.data) {
    const { records, rows, total } = response.data.data;
    yield all([
      put({ type: reportsDirectory[sliceName], payload: { data: rows, records, total, computedProperty } }),
      put(removePendingRequestId(requestId)),
    ]);
  }
}

function* getJobUuidSaga({ payload }: IGetJobUuidSagaState) {
  const { uuid } = payload;
  yield put(addPendingRequestId(`${getJobUuidActionType}`));

  const response: AxiosResponse<IResponseGetJobUuid> = yield call(() =>
    http().get<IResponseGetJobUuid>(`${api}/job/${uuid}`),
  );

  if (response?.data?.data) {
    const adaptedJobUuid: IUuidData = yield worker.sendToMethod('jobUuid', response.data.data);
    yield all([put(setUuidData({ data: adaptedJobUuid })), put(removePendingRequestId(`${getJobUuidActionType}`))]);
  }
}

export function* postUuidSaga({ payload }: IPostUuidSagaState) {
  const { uuid, files, action } = payload;
  const body: string = yield worker.sendToMethod('uuidBody', files);

  const response: AxiosResponse<IResponsePostUuid> = yield call(() =>
    http().post<IResponsePostUuid>(`${api}/job/${uuid}/update`, body),
  );
  if (response?.data?.data) {
    yield action?.();
  }
}

export const getReportsDirectoryAction = createAction<IGetReportsActionState>(`${catalogSliceName}/job/reports`);
export const postTaskAction = createAction<IPostTaskActionState>('reports/post/job/type');
export const getJobUuidAction = createAction<IGetJobUuidActionState>(getJobUuidActionType);
export const getReportsFilesAction = createAction<IGetReportsFilesActionState>('reports/get/job/type');
export const postUuidAction = createAction<IPostUuidActionState>('job/uuid/update');
export function* reportsSaga() {
  yield takeEvery(postTaskAction.type, safe(postTaskSaga));
  yield takeEvery(getReportsFilesAction.type, safe(getReportsFilesSaga));
  yield takeEvery(getReportsDirectoryAction.type, safe(getReportsDirectorySaga));
  yield takeEvery(getJobUuidAction.type, safe(getJobUuidSaga));
  yield takeEvery(postUuidAction.type, safe(postUuidSaga));
}
