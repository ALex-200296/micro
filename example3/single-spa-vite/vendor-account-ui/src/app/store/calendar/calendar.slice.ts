import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currentMonth } from '@shared/ui';
import dayjs from 'dayjs';

import { CalendarFilters } from './calendar.data';
import {
  CalendarDatesFilterStateType,
  CalendarsFilterValuesStateType,
  CalendarVisibleDatesFilterStateType,
  ICalendarEventsCountState,
  ICalendarEventsState,
  ICalendarEventState,
  ICalendarExportFileState,
  ICalendarInitialState,
} from './calendar.types';

export const calendarSliceName = 'calendar';

export const initialState: ICalendarInitialState = {
  calendarEvents: [],
  calendarEventsCount: {
    total: 0,
    meetCount: 0,
  },
  calendarEvent: {
    isEmpty: true,
    id: '',
    codeCli: [],
    execList: [],
    namePrj: '',
    nearestMon: '',
    obj_id: '',
    obj_type: '',
    pme_ankansw: '',
    pme_anket: '',
    pme_chief: '',
    pme_comdoc: '',
    pme_comment: '',
    pme_datef: '',
    pme_datep: '',
    pme_result: '',
    pme_state: '',
    pme_subtheme: '',
    pme_task: '',
    pme_endtimep: '',
    pme_territory: '',
    pme_theme: '',
    pme_timep: '',
    pme_type: '',
    RO_attachList: [],
    RO_comment: '',
    RO_endtimep: '',
    RO_placeholder_result: '',
    RO_state: '',
    RO_subtheme: '',
    RO_territory: '',
    RO_theme: '',
    RO_type: '',
    RO_whencre: '',
    RO_whomcre: '',
    sign531: '',
  },
  calendarFilters: {
    startVisibleDate: dayjs().startOf('month').startOf('isoWeek').toDate(), // для календаря(видимые числа месяца в данный момент)
    endVisibleDate: dayjs().endOf('month').endOf('isoWeek').toDate(), // для календаря(видимые числа месяца в данный момент)
    [CalendarFilters.PME_STATE]: '',
    [CalendarFilters.PME_SUBTHEME]: '',
    man_code: '',
    [CalendarFilters.EXM_MAN_CODE]: '',
    startDate: currentMonth.firstDay, // Для прочей фильтрации по датам(начало)
    endDate: currentMonth.lastDay, // Для прочей фильтрации по датам(конец)
  },
  calendarFile: {
    fileName: '',
    startDate: '',
    finalDate: '',
  },
};

const calendarSlice = createSlice({
  name: calendarSliceName,

  initialState,
  reducers: {
    setCalendarEvents: (state, action: PayloadAction<ICalendarEventsState[]>) => {
      state.calendarEvents = action.payload;
    },
    setCalendarEvent: (state, action: PayloadAction<ICalendarEventState>) => {
      state.calendarEvent = action.payload;
    },
    resetCalendarEvent: (state) => {
      state.calendarEvent = initialState.calendarEvent;
    },
    setCalendarVisibleDate: (state, action: PayloadAction<CalendarVisibleDatesFilterStateType>) => {
      const { startVisibleDate, endVisibleDate } = action.payload;
      state.calendarFilters.startVisibleDate = startVisibleDate;
      state.calendarFilters.endVisibleDate = endVisibleDate;
    },
    setCalendarExmManCode: (state, action: PayloadAction<string>) => {
      state.calendarFilters.exmManCode = action.payload;
    },
    setCalendarEventsCount: (state, action: PayloadAction<ICalendarEventsCountState>) => {
      state.calendarEventsCount = action.payload;
    },
    setCalendarExportFileName: (state, action: PayloadAction<ICalendarExportFileState>) => {
      state.calendarFile = action.payload;
    },
    resetCalendarExportFileName: (state) => {
      state.calendarFile = initialState.calendarFile;
    },
    setResponsibleFilter: (state, action: PayloadAction<string>) => {
      state.calendarFilters.man_code = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.calendarFilters.pme_state = action.payload;
    },
    setPartitionFilter: (state, action: PayloadAction<string>) => {
      state.calendarFilters.pme_subtheme = action.payload;
    },
    setCalendarFilters: (state, action: PayloadAction<Partial<CalendarsFilterValuesStateType>>) => {
      state.calendarFilters = { ...state.calendarFilters, ...action.payload };
    },
    setDateFilter: (state, action: PayloadAction<CalendarDatesFilterStateType>) => {
      const { startDate, endDate } = action.payload;
      state.calendarFilters.startDate = startDate;
      state.calendarFilters.endDate = endDate;
    },
    resetCalendarFilters: (state) => {
      state.calendarFilters = initialState.calendarFilters;
    },
    resetCalendarFilter: (state, action: PayloadAction<(typeof CalendarFilters)[keyof typeof CalendarFilters]>) => {
      state.calendarFilters[action.payload] = initialState.calendarFilters[action.payload];
    },
  },
});

export const {
  actions: {
    setCalendarEvents,
    setCalendarEvent,
    resetCalendarEvent,
    setCalendarVisibleDate,
    setCalendarExmManCode,
    setCalendarEventsCount,
    setCalendarExportFileName,
    resetCalendarExportFileName,
    setResponsibleFilter,
    setStatusFilter,
    setPartitionFilter,
    setDateFilter,
    resetCalendarFilters,
    resetCalendarFilter,
    setCalendarFilters,
  },
  reducer: calendarStateReducer,
} = calendarSlice;
