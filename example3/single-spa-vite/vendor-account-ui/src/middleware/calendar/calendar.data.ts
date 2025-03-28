import { ICalendarEventsState } from '@app/store/calendar/calendar.types';
import { shortYearSlashedWithTimeWithoutSeconds } from '@shared/ui';
import dayjs from 'dayjs';

import { IResponseEventsState } from './calendar.types';

export const defaultRows: number = 100000;
export const defaultPage: number = 1;

export const adapterCalendarEvents = (events: IResponseEventsState[]): ICalendarEventsState[] => {
  return events.map((event) => {
    const {
      id = '',
      pme_datep = '',
      pme_timep = '',
      pme_endtimep = '',
      RO_state = '',
      RO_subthemeDesc = '',
      RO_themeDesc = '',
      pme_task = '',
      pme_state = '',
    } = event;
    return {
      id,
      title: RO_subthemeDesc,
      start: dayjs(`${pme_datep} ${pme_timep}`, shortYearSlashedWithTimeWithoutSeconds).toDate(),
      end: dayjs(`${pme_datep} ${pme_endtimep}`, shortYearSlashedWithTimeWithoutSeconds).toDate(),
      direction: RO_themeDesc,
      chapter: RO_subthemeDesc,
      status: RO_state,
      taskText: pme_task,
      statusCode: pme_state,
    };
  });
};
