import { IResponseGetExportCliTask } from '@middleware/calendar/calendar.types';
import { ICalendarEventState, ICalendarExportFileState } from '@store/calendar/calendar.types';

export type AdapterCalendarEventType = (event: ICalendarEventState) => ICalendarEventState;

export type AdapterExportCliTask = (data: IResponseGetExportCliTask['data']) => ICalendarExportFileState;
