import { Formats, View } from 'react-big-calendar';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import { IEvent } from './Event/Event.types';
import { ILangState } from './BigCalendar.types';

dayjs.extend(isoWeek);

export const defaultView: View = 'month';
export const formats: Formats = {
  weekdayFormat: 'dd',
  dayFormat: 'DD dd',
};
export const lang: ILangState = {
  ru: {
    week: 'Неделя',
    day: 'День',
    month: 'Месяц',
    work_week: 'Рабочая Неделя',
    previous: 'Предыдущая',
    next: 'Следующая',
    today: 'Сегодня',
    agenda: 'Расписание',
    date: 'Дата',
    time: 'Время',
    event: 'Событие',
    noEventsInRange: 'Нет событий для отображения',
  },
};

export const minimumPresentationTime = dayjs().year(2018).month(1).hour(8).minute(0).second(0).toDate();
export const timeFormat: string = 'HH:mm';

export const eventPropsGetter = (event: IEvent) => ({
  className: event.statusCode,
});

export const getStartAndEndDate = (date: Date, view: View) => {
  switch (view) {
    case 'day':
      return {
        start: dayjs(date).startOf('day').toDate(),
        end: dayjs(date).endOf('day').toDate(),
      };
    case 'week':
    case 'work_week':
      return {
        start: dayjs(date).startOf('isoWeek').toDate(),
        end: dayjs(date).endOf('isoWeek').toDate(),
      };
    case 'agenda':
      return {
        start: dayjs(date).startOf('day').toDate(),
        end: dayjs(date).endOf('day').add(1, 'month').toDate(),
      };
    default:
      return {
        start: dayjs(date).startOf('month').startOf('isoWeek').toDate(),
        end: dayjs(date).endOf('month').endOf('isoWeek').toDate(),
      };
  }
};
