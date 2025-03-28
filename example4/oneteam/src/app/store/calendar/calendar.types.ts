import { Dayjs } from 'dayjs';

export interface ICalendarEventsState {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: string;
  statusCode: string;
  direction: string;
  chapter: string;
  taskText: string;
}

export interface ICalendarEventCodeCli {
  code: string;
  supp_cust: string;
  label: string;
  exm_mancode: string;
  exm_fio: string;
  exm_phonem: string;
  exw_phone: string;
  exw_position: string;
}

export interface ICalendarEventFile {
  attach: string;
  label: string;
  mandatory: string;
  file: string;
}

export interface ICalendarEventExecList {
  codeMan: string;
  labelMan: string;
  codeOP: string;
  labelOP: string;
  codeRole: string;
  status: string;
  phone: string;
  email: string;
}
export interface ICalendarEventState {
  isEmpty: boolean;
  id: string;
  codeCli: ICalendarEventCodeCli[];
  execList: ICalendarEventExecList[];
  namePrj: string;
  nearestMon: string;
  obj_id: string;
  obj_type: string;
  pme_ankansw: string;
  pme_anket: string;
  pme_chief: string;
  pme_comdoc: string;
  pme_comment: string;
  pme_datef: string;
  pme_datep: string;
  pme_result: string;
  pme_state: string;
  pme_subtheme: string;
  pme_endtimep: string;
  pme_task: string;
  pme_territory: string;
  pme_theme: string;
  pme_timep: string;
  pme_type: string;
  RO_attachList: ICalendarEventFile[];
  RO_comment: string;
  RO_endtimep: string;
  RO_placeholder_result: string;
  RO_state: string;
  RO_subtheme: string;
  RO_territory: string;
  RO_theme: string;
  RO_type: string;
  RO_whencre: string;
  RO_whomcre: string;
  sign531: string;
}

export interface ICalendarEventsCountState {
  total: number;
  meetCount: number;
}

export interface ICalendarExportFileState {
  fileName: string;
  startDate: string;
  finalDate: string;
}

interface ICalendarFiltersState {
  startVisibleDate: Date;
  endVisibleDate: Date;
  man_code: string;
  pme_state: string;
  pme_subtheme: string;
  exmManCode: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

export type CalendarsFilterValuesStateType = Omit<
  ICalendarFiltersState,
  'startDate' | 'endDate' | 'startVisibleDate' | 'endVisibleDate'
>;
export type CalendarDatesFilterStateType = Pick<ICalendarFiltersState, 'startDate' | 'endDate'>;
export type CalendarVisibleDatesFilterStateType = Pick<ICalendarFiltersState, 'startVisibleDate' | 'endVisibleDate'>;

export interface ICalendarInitialState {
  calendarEvents: ICalendarEventsState[];
  calendarEventsCount: ICalendarEventsCountState;
  calendarEvent: ICalendarEventState;
  calendarFilters: ICalendarFiltersState;
  calendarFile: ICalendarExportFileState;
}
