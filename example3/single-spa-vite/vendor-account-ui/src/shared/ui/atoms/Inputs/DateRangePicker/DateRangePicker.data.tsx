import dayjs from 'dayjs';
const today = dayjs();

export const currentMonth = {
  firstDay: dayjs(today).startOf('month'),
  lastDay: dayjs(today).endOf('month'),
};
