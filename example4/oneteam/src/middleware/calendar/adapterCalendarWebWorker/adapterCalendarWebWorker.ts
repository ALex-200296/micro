import { IResponseGetExportCliTask } from '@middleware/calendar/calendar.types';
import { ICalendarEventState, ICalendarExportFileState } from '@store/calendar/calendar.types';
import { EasyWebWorkerBody } from 'easy-web-worker';

import { AdapterCalendarEventType, AdapterExportCliTask } from './adapterCalendar.types';

export const adapterCalendarWebWorker: EasyWebWorkerBody = ({ onMessage }) => {
  const initialCalendarEvent: ICalendarEventState = {
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
  };

  const adapterCalendarEvent: AdapterCalendarEventType = (event) => ({
    ...initialCalendarEvent,
    ...Object.fromEntries(Object.entries(event).filter((items) => items[1])),
  });

  const adapterExportCliTask: AdapterExportCliTask = (data) => {
    const { date1, date2, fileName } = data;
    return { startDate: date1, finalDate: date2, fileName };
  };

  onMessage<ICalendarEventState, ICalendarEventState>('calendarEvent', (message) => {
    const { payload } = message;
    const adaptedEvent = adapterCalendarEvent(payload);
    message.resolve(adaptedEvent);
  });

  onMessage<IResponseGetExportCliTask['data'], ICalendarExportFileState>('exportCliTask', (message) => {
    const { payload } = message;
    const adaptedEvent = adapterExportCliTask(payload);
    message.resolve(adaptedEvent);
  });
};
