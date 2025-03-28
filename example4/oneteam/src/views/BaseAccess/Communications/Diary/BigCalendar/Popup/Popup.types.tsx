import { ICalendarEventsState } from '@app/store/calendar/calendar.types';

export interface IPopupProps {
  total: number;
  events: ICalendarEventsState[];
  date: Date | null;
  onClickEvent: (event: ICalendarEventsState) => void;
}
