import dayjs, { Dayjs } from 'dayjs';

export const disabledPastDate = (current: Dayjs) => current && current < dayjs().startOf('day');

export const disabledTodayAndFutureDate = (current: Dayjs) => current && current > dayjs().startOf('day');
