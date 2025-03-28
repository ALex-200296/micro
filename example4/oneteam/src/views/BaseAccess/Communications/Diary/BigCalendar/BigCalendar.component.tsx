import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Calendar, dayjsLocalizer, View } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { calendarSelectors } from '@app/store/calendar/calendar.selectors';
import { setCalendarVisibleDate } from '@app/store/calendar/calendar.slice';
import { ICalendarEventsState } from '@app/store/calendar/calendar.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import {
  getCalendarCliTaskAction,
  getCalendarCliTaskActionType,
  getCalendarTaskAction,
} from '@middleware/calendar/calendar.saga';
import { Spin as Loader } from 'antd';
import dayjs from 'dayjs';

import 'dayjs/locale/ru';

import Event from './Event/Event.component';
import Popup from './Popup/Popup.component';
import { IPopupProps } from './Popup/Popup.types';
import {
  defaultView,
  eventPropsGetter,
  formats,
  getStartAndEndDate,
  lang,
  minimumPresentationTime,
} from './BigCalendar.data';
import { IBigCalendarProps, ILangState } from './BigCalendar.types';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './BigCalendar.scss';

dayjs.locale('ru');
const localizer = dayjsLocalizer(dayjs);

const BigCalendar: React.FC<IBigCalendarProps> = ({ handleOpen }) => {
  const dispatch = useDispatch();
  const [culture] = useState<keyof ILangState>('ru');
  const [currentDate, setCurrentDate] = useState<Date>(dayjs().toDate());

  const calendarEvents = useSelector(calendarSelectors.getCalendarEvents);
  const { endDate, startDate, ...filters } = useSelector(calendarSelectors.getCalendarFilters);
  const loading = useSelector(uiSelectors.getIsRequestPending(getCalendarCliTaskActionType));

  const [popupData, setPopupData] = useState<Pick<IPopupProps, 'events' | 'date'>>({ events: [], date: null });

  const eventsPropGetter = useCallback((event: ICalendarEventsState) => eventPropsGetter(event), []);

  void startDate;
  void endDate;

  useEffect(() => {
    dispatch(
      getCalendarCliTaskAction({
        ...filters,
        startDate: filters.startVisibleDate,
        endDate: filters.endVisibleDate,
      }),
    );
  }, [...Object.values(filters)]);

  useEffect(
    () => () => {
      const { start, end } = getStartAndEndDate(dayjs().toDate(), defaultView);
      dispatch(setCalendarVisibleDate({ startVisibleDate: start, endVisibleDate: end }));
    },
    [],
  );

  const onSelectEvent = useCallback((event: ICalendarEventsState) => {
    dispatch(getCalendarTaskAction({ id: event.id }));
    handleOpen();
  }, []);

  const onNavigate = useCallback((newDate: Date, view: View) => {
    const { start, end } = getStartAndEndDate(newDate, view);
    setCurrentDate(newDate);
    dispatch(setCalendarVisibleDate({ startVisibleDate: start, endVisibleDate: end }));
  }, []);

  const onView = useCallback(
    (view: View) => {
      const { start, end } = getStartAndEndDate(currentDate, view);
      dispatch(setCalendarVisibleDate({ startVisibleDate: start, endVisibleDate: end }));
    },
    [currentDate],
  );

  const onShowMore = useCallback((events: ICalendarEventsState[], date: Date) => {
    setPopupData({ events, date });
  }, []);

  const { messages } = useMemo(
    () => ({
      messages: {
        ...lang[culture],
        showMore: (total: number): any => (
          <Popup date={popupData.date} events={popupData.events} total={total} onClickEvent={onSelectEvent} />
        ),
      },
    }),
    [culture, popupData],
  );

  return (
    <Loader spinning={loading} className='loader'>
      <Calendar
        popup={false}
        culture={culture}
        formats={formats}
        messages={messages}
        localizer={localizer}
        tooltipAccessor={null!}
        doShowMoreDrillDown={false}
        min={minimumPresentationTime}
        startAccessor='start'
        endAccessor='end'
        defaultView={defaultView}
        views={['month', 'week', 'work_week', 'day', 'agenda']}
        className='calendar'
        events={calendarEvents}
        components={{
          event: Event,
        }}
        onSelectEvent={onSelectEvent}
        onNavigate={onNavigate}
        eventPropGetter={eventsPropGetter}
        onView={onView}
        onShowMore={onShowMore}
      />
    </Loader>
  );
};

export default memo(BigCalendar);
