import { ICalendarEventState } from '@app/store/calendar/calendar.types';
import { IResponse } from '@middleware/root.types';

export interface IGetTaskCalendarActionState {
  id: string;
}

export interface IPostCalendarActionState {
  obj_id: string;
  pme_type: string;
  pme_task: string;
  cli_code: string;
  obj_type: string;
  man_code: string;
  pme_theme: string;
  pme_datep: string;
  pme_timep: string;
  pme_comdoc: string;
  exm_mancode: string;
  pmp_class37: string;
  pme_subtheme: string;
  pme_endtimep: string;
  pr_meetingRowid: string;
  pme_extuser: string;
  request_method?: string;
  pme_state?: string;
}

export interface IGetCalendarCliTaskActionState {
  startDate?: string;
  endDate?: string;
  pme_state?: string;
  pme_subtheme?: string;
  man_code?: string;
  exmManCode?: string;
  objId?: string;
  objType?: string;
  page?: number;
  rows?: number;
}

export interface ISubscribeToCalendarActionState {
  actions?: { payload: any; type: string }[];
}

export interface IGetExportCliTaskActionState {
  startDate: string;
  finalDate: string;
}

export interface IUpdateCalendarTaskActionState {
  post: IPostCalendarActionState;
  getEvents?: IGetCalendarCliTaskActionState;
  getEvent?: IGetTaskCalendarActionState;
}

export interface ICalendarUpdateSagaState {
  payload: IUpdateCalendarTaskActionState;
  type: string;
}

export interface ISubscribeToCalendarSagaState {
  payload: ISubscribeToCalendarActionState;
  type: string;
}

export interface IPostCalendarSagaState {
  payload: IPostCalendarActionState;
  type: string;
}

export interface IGetTaskCalendarSagaState {
  payload: IGetTaskCalendarActionState;
  type: string;
}

export interface IGetCalendarCliTaskSagaState {
  payload: IGetCalendarCliTaskActionState;
  type: string;
}
export interface IGetExportCliTaskSagaState {
  payload: IGetExportCliTaskActionState;
  type: string;
}
export interface IResponseEventsState {
  id: string;
  RO_subthemeDesc: string;
  RO_themeDesc: string;
  RO_state: string;
  pme_datep: string;
  pme_timep: string;
  pme_endtimep: string;
  pme_task: string;
  pme_state: string;
}

export interface IResponsePostCalendar extends IResponse {
  data: any;
}

export interface IResponseGetTaskCalendar extends IResponse {
  data: {
    rows: ICalendarEventState[];
  };
}

export interface IResponseGetCliTaskCalendar extends IResponse {
  data: {
    rows: IResponseEventsState[];
    records: number;
    userdata: {
      meet_count: number;
    };
  };
}
export interface IResponseGetExportCliTask extends IResponse {
  data: {
    fileName: string;
    date1: string;
    date2: string;
  };
}
