import { api, safe } from '@middleware/root.data';
import { createAction } from '@reduxjs/toolkit';
import { http } from '@shared/lib/services';;
import {
  projectSliceName,
  setProjectDetails,
  setProjectsData,
  setSelectedProjectId,
  updateProjectDetails,
} from '@app/store/project/project.slice';
import { ProjectsComputedProperty } from '@app/store/project/project.types';
import { addPendingRequestId, removePendingRequestId, setNotification } from '@app/store/ui/ui.slice';
import { paramsGenerator } from '@shared/lib/utils/helpers/paramsGenerator.helpers';
import { AxiosResponse } from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { getProjectRequestDetailsError } from './project.error';
import {
  IGetProjectRequestDetailsResponse,
  IGetProjectRequestsListResponse,
  IGetProjectsListActionPayload,
  IGetProjectsListResponse,
  IGetProjectsListSagaState,
  IGetProjectsRequestsSagaState,
  IGetRequestDetailsActionPayload,
  IGetRequestDetailsSagaState,
  IProjectsRequestsPayload,
  IUpdateRequestDetailsActionPayload,
  IUpdateRequestDetailsSagaState,
} from './project.types';

function* getProjectRequestDetailsSaga({ payload }: IGetRequestDetailsSagaState) {
  const { id, detailsType, pendingRequest, getResponse } = payload;
  yield pendingRequest && put(addPendingRequestId(pendingRequest));
  const project: AxiosResponse<IGetProjectRequestDetailsResponse> = yield call(() =>
    http().get<IGetProjectRequestDetailsResponse>(`${api}/project/getSubPrj/${id}`),
  );
  const data = project?.data?.data.rows[0];
  if (data) yield put(setProjectDetails({ id: id, projectData: data, computedProperty: detailsType }));
  yield pendingRequest && put(removePendingRequestId(pendingRequest));
  yield getResponse?.(data);
}

function* updateProjectDetailsSaga({ payload }: IUpdateRequestDetailsSagaState) {
  const { data, id, computedProperty, listFilterData } = payload;
  const postResponse: AxiosResponse<IGetProjectRequestDetailsResponse> = yield call(() =>
    http().post(`${api}/project/setExtSubPrj/${id}`, data),
  );
  if (postResponse) {
    const { code, message } = postResponse.data.status;
    if (computedProperty === ProjectsComputedProperty.projectRequests) {
      const actionId = `${projectSliceName}/${ProjectsComputedProperty.projectRequests}`;
      yield all([
        put(addPendingRequestId(actionId)),
        call(() => getProjectRequestsListSaga({ type: getProjectRequestsListAction.type, payload: {} })),
        put(setSelectedProjectId({ id: '', computedProperty })),
      ]);
    }
    if (computedProperty === ProjectsComputedProperty.projects) {
      const project: AxiosResponse<IGetProjectRequestDetailsResponse> = yield call(() =>
        http().get<IGetProjectRequestDetailsResponse>(`${api}/project/getSubPrj/${id}`),
      );
      const data = project?.data?.data.rows[0];
      yield all([
        put(updateProjectDetails({ id, computedProperty, projectData: data })),
        listFilterData &&
          call(() => getProjectsListSaga({ type: getProjectRequestsListAction.type, payload: listFilterData })),
      ]);
    }
    yield put(setNotification({ code: code, message: { title: message } }));
  }
}

function* getProjectRequestsListSaga({ payload }: IGetProjectsRequestsSagaState) {
  const { page, rows } = payload;
  const params = paramsGenerator([
    ['page', page],
    ['rows', rows],
  ]);
  const actionId = `${projectSliceName}/${ProjectsComputedProperty.projectRequests}`;
  yield put(addPendingRequestId(actionId));
  const response: AxiosResponse<IGetProjectRequestsListResponse> = yield call(() =>
    http().get(`${api}/project/getPrjListReq`, { params }),
  );
  const { page: _, ...data } = response.data.data;
  void _;
  if (response?.data) {
    yield all([
      put(setProjectsData({ list: data, computedProperty: ProjectsComputedProperty.projectRequests })),
      put(removePendingRequestId(actionId)),
    ]);
  }
}

function* getProjectsListSaga({ payload }: IGetProjectsListSagaState) {
  const actionId = `${projectSliceName}/${ProjectsComputedProperty.projects}`;
  yield put(addPendingRequestId(actionId));

  const {
    page,
    rows,
    extCode,
    mnfDCode,
    prjName,
    prjSupply,
    prjAddr,
    prjMst,
    exmManCode,
    subPrjStatus,
    isSetId,
    getResponse,
  } = payload;
  const params = paramsGenerator([
    ['rows', rows],
    ['extCode', extCode],
    ['exm_mancode', exmManCode],
    ['mnfDCode', mnfDCode],
    ['prjName', prjName],
    ['prjSupply', prjSupply],
    ['prjAddr', prjAddr],
    ['prjMst', prjMst],
    ['prjStatus', subPrjStatus],
    ['page', page],
  ]);

  const response: AxiosResponse<IGetProjectsListResponse> = yield call(() =>
    http().get(`${api}/project/getSubPrjList`, { params }),
  );
  const { page: _, ...data } = response.data.data;
  void _;
  if (response?.data) {
    yield all([
      put(setProjectsData({ list: data, computedProperty: ProjectsComputedProperty.projects })),
      put(removePendingRequestId(actionId)),
    ]);
  }
  if ((extCode || mnfDCode) && isSetId) {
    const project = response.data.data.rows.find(
      ({ mnf_ext_prj_code, prj_code }) => mnf_ext_prj_code === extCode || mnfDCode === prj_code,
    );
    yield project && put(setSelectedProjectId({ id: project.id, computedProperty: ProjectsComputedProperty.projects }));
  } else {
    yield getResponse?.(!!response.data.data.rows.length);
  }
}

export const getProjectRequestDetailsAction = createAction<IGetRequestDetailsActionPayload>(
  `${projectSliceName}/getSubPrj`,
);
export const updateProjectDetailsAction = createAction<IUpdateRequestDetailsActionPayload>(
  `${projectSliceName}/setExtSubPrj`,
);
export const getProjectRequestsListAction = createAction<IProjectsRequestsPayload>(`${projectSliceName}/getPrjList`);
export const getProjectsListAction = createAction<IGetProjectsListActionPayload>(`${projectSliceName}/getSubPrjList`);

export function* projectSaga() {
  yield takeEvery(
    getProjectRequestDetailsAction.type,
    safe(getProjectRequestDetailsSaga, getProjectRequestDetailsError),
  );
  yield takeEvery(updateProjectDetailsAction.type, safe(updateProjectDetailsSaga));
  yield takeEvery(getProjectRequestsListAction.type, safe(getProjectRequestsListSaga));
  yield takeEvery(getProjectsListAction.type, safe(getProjectsListSaga));
}
