import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { calendarSelectors } from '@app/store/calendar/calendar.selectors';
import { Descriptions } from 'antd';

import { getEventsCountConfig } from './EventsCount.data';

const EventsCount: React.FC = () => {
  const { total, meetCount } = useSelector(calendarSelectors.getCalendarEventsCount);
  return <Descriptions column={1} size='small' items={getEventsCountConfig(meetCount, total)} />;
};

export default memo(EventsCount);
