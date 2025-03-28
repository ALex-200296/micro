import {
  calendarSliceName,
  setCalendarEvent,
  setCalendarEvents,
  setCalendarEventsCount,
  setCalendarExportFileName,
} from '@app/store/calendar/calendar.slice';
import { ICalendarEventState, ICalendarExportFileState } from '@app/store/calendar/calendar.types';
import { addPendingRequestId, removePendingRequestId, setNotification } from '@app/store/ui/ui.slice';
import { api, safe } from '@middleware/root.data';
import { IResponse } from '@middleware/root.types';
import { createAction } from '@reduxjs/toolkit';
import { formDataGenerator, paramsGenerator } from '@shared/lib';
import { http } from '@shared/lib/services';
import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { createEasyWebWorker } from 'easy-web-worker';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { adapterCalendarWebWorker } from './adapterCalendarWebWorker/adapterCalendarWebWorker';
import { adapterCalendarEvents, defaultPage, defaultRows } from './calendar.data';
import {
  ICalendarUpdateSagaState,
  IGetCalendarCliTaskActionState,
  IGetCalendarCliTaskSagaState,
  IGetExportCliTaskActionState,
  IGetExportCliTaskSagaState,
  IGetTaskCalendarActionState,
  IGetTaskCalendarSagaState,
  IPostCalendarActionState,
  IPostCalendarSagaState,
  IResponseGetCliTaskCalendar,
  IResponseGetExportCliTask,
  IResponseGetTaskCalendar,
  IResponsePostCalendar,
  ISubscribeToCalendarActionState,
  ISubscribeToCalendarSagaState,
  IUpdateCalendarTaskActionState,
} from './calendar.types';

export const getCalendarCliTaskActionType = `${calendarSliceName}/meeting/getCliTask`;
export const getCalendarTaskActionType = `${calendarSliceName}/meeting/getTask`;
export const postCalendarTaskActionType = `${calendarSliceName}/meeting/createTask`;
export const getExportCliTaskActionType = `${calendarSliceName}/meeting/exportCliTask`;
export const subscribeToCalendarActionType = `${calendarSliceName}/subscribeToCalendar`;
export const updateCaledarTaskActionType = `${calendarSliceName}/meeting/updateTask`;

const worker = createEasyWebWorker(adapterCalendarWebWorker);

function* calendarPostSaga({ payload }: IPostCalendarSagaState) {
  const {
    obj_id,
    pme_type,
    pme_task,
    pme_state,
    cli_code,
    man_code,
    obj_type,
    pme_datep,
    pme_timep,
    pme_theme,
    pme_comdoc,
    pmp_class37,
    exm_mancode,
    pme_subtheme,
    pme_endtimep,
    request_method,
    pr_meetingRowid,
    pme_extuser,
  } = payload;

  const formData = formDataGenerator([
    ['obj_id', obj_id],
    ['obj_type', obj_type],
    ['pme_type', pme_type],
    ['pme_state', pme_state],
    ['pme_task', pme_task],
    ['cli-code', cli_code],
    ['man-code', man_code],
    ['pme_theme', pme_theme],
    ['pme_datep', pme_datep],
    ['pme_timep', pme_timep],
    ['pme_comdoc', pme_comdoc],
    ['pmp_class37', pmp_class37],
    ['exm_mancode', exm_mancode],
    ['pme_subtheme', pme_subtheme],
    ['pme_endtimep', pme_endtimep],
    ['request_method', request_method],
    ['pr_meetingRowid', pr_meetingRowid],
    ['pme_extuser', pme_extuser],
  ]);

  const response: AxiosResponse<IResponsePostCalendar> = yield call(() =>
    http().post<IResponsePostCalendar>(`${api}/meeting/task`, formData),
  );
  if (response?.data?.status) {
    const { code, message } = response.data.status;
    yield put(setNotification({ message: { title: message }, code }));
  }
}

function* calendarGetCliTaskSaga({ payload }: IGetCalendarCliTaskSagaState) {
  const { startDate, endDate, man_code, pme_state, pme_subtheme, exmManCode, objId, objType, page, rows } = payload;
  yield put(addPendingRequestId(getCalendarCliTaskActionType));
  const params = paramsGenerator([
    ['date1', startDate],
    ['date2', endDate],
    ['man_code', man_code],
    ['pme_state', pme_state],
    ['pme_subtheme', pme_subtheme],
    ['exm_mancode', exmManCode],
    ['obj_id', objId],
    ['obj_type', objType],
    ['rows', rows || defaultRows],
    ['page', page || defaultPage],
  ]);

  yield put(addPendingRequestId(`${calendarSliceName}/meeting/getCliTask`));
  const response: AxiosResponse<IResponseGetCliTaskCalendar> = yield call(() =>
    http().get<IResponseGetCliTaskCalendar>(`${api}/meeting/getCliTask`, { params }),
  );
  if (response?.data?.data) {
    const calendarEvents = adapterCalendarEvents(response.data.data.rows);
    const calendarEventsCount = {
      total: response.data.data.records || 0,
      meetCount: response.data.data?.userdata?.meet_count || 0,
    };
    yield all([
      put(setCalendarEvents(calendarEvents)),
      put(setCalendarEventsCount(calendarEventsCount)),
      put(removePendingRequestId(`${calendarSliceName}/meeting/getCliTask`)),
    ]);
  }
  yield put(removePendingRequestId(getCalendarCliTaskActionType));
}

function* calendarGetTaskSaga({ payload }: IGetTaskCalendarSagaState) {
  const { id } = payload;
  const params = paramsGenerator([['pr_meetingRowid', id]]);
  const response: AxiosResponse<IResponseGetTaskCalendar> = yield call(() =>
    http().get<IResponseGetTaskCalendar>(`${api}/meeting/task`, { params }),
  );
  if (response?.data?.data) {
    const adaptedEvent: ICalendarEventState = yield worker.sendToMethod('calendarEvent', response.data.data.rows[0]);
    yield put(setCalendarEvent({ ...adaptedEvent, isEmpty: false }));
  }
}

function* getExportCliTaskSaga({ payload }: IGetExportCliTaskSagaState) {
  const { startDate, finalDate } = payload;
  yield put(addPendingRequestId(`${calendarSliceName}/meeting/exportCliTask`));
  const params = paramsGenerator([
    ['date1', startDate],
    ['date2', finalDate],
  ]);
  const response: AxiosResponse<IResponseGetExportCliTask> = yield call(() =>
    http().get<IResponseGetExportCliTask>(`${api}/meeting/exportCliTask`, { params }),
  );
  if (response?.data?.data) {
    const adaptedExportCliTask: ICalendarExportFileState = yield worker.sendToMethod(
      'exportCliTask',
      response.data.data,
    );

    yield all([
      put(removePendingRequestId(`${calendarSliceName}/meeting/exportCliTask`)),
      put(setCalendarExportFileName(adaptedExportCliTask)),
    ]);
  }
}

function* subscribeToCalendarSaga({ payload }: ISubscribeToCalendarSagaState) {
  const { actions } = payload;
  const currentHour = dayjs().hour();
  const params = paramsGenerator([['current_hour', currentHour]]);
  try {
    const response: AxiosResponse<IResponse> = yield call(() => http().get(`${api}/meeting/getEXPLink`, { params }));
    void response;
    if (actions) {
      yield all([...actions.map(({ type, payload }) => put({ type, payload }))]);
    }
  } catch (error) {
    yield put(
      setNotification({
        message: { title: 'Попробуйте сформировать ссылку позже или воспользуйтесь формой обратной связи' },
        variant: 'warning',
      }),
    );
  }
}

function* calendarUpdateSaga({ payload }: ICalendarUpdateSagaState) {
  const { post, getEvent, getEvents } = payload;
  yield put(addPendingRequestId(updateCaledarTaskActionType));
  yield call(() => calendarPostSaga({ payload: post, type: postCalendarTaskActionType }));

  if (getEvent) yield call(() => calendarGetTaskSaga({ payload: getEvent, type: getCalendarTaskActionType }));
  if (getEvents) yield call(() => calendarGetCliTaskSaga({ payload: getEvents, type: getCalendarCliTaskActionType }));

  yield put(removePendingRequestId(updateCaledarTaskActionType));
}

export const getCalendarCliTaskAction = createAction<IGetCalendarCliTaskActionState>(getCalendarCliTaskActionType);
export const getCalendarTaskAction = createAction<IGetTaskCalendarActionState>(getCalendarTaskActionType);
export const postCalendarTaskAction = createAction<IPostCalendarActionState>(postCalendarTaskActionType);
export const updateCaledarTaskAction = createAction<IUpdateCalendarTaskActionState>(updateCaledarTaskActionType);
export const getExportCliTaskAction = createAction<IGetExportCliTaskActionState>(getExportCliTaskActionType);
export const subscribeToCalendarAction = createAction<ISubscribeToCalendarActionState>(subscribeToCalendarActionType);

export function* calendarSaga() {
  yield takeEvery(postCalendarTaskAction.type, safe(calendarPostSaga));
  yield takeEvery(getCalendarTaskAction.type, safe(calendarGetTaskSaga));
  yield takeEvery(getCalendarCliTaskAction.type, safe(calendarGetCliTaskSaga));
  yield takeEvery(getExportCliTaskAction.type, safe(getExportCliTaskSaga));
  yield takeEvery(subscribeToCalendarAction.type, safe(subscribeToCalendarSaga));
  yield takeEvery(updateCaledarTaskAction.type, safe(calendarUpdateSaga));
}
