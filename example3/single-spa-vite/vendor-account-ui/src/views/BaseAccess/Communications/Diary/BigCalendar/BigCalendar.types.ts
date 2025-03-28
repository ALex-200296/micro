export interface ICultureState {
  week: string;
  work_week: string;
  day: string;
  month: string;
  previous: string;
  next: string;
  today: string;
  agenda: string;
  date: string;
  time: string;
  event: string;
  showMore?: (total: number) => string;
  noEventsInRange: string;
}
export interface ILangState {
  ru: ICultureState;
}

export interface IBigCalendarProps {
  handleOpen: () => void;
}
