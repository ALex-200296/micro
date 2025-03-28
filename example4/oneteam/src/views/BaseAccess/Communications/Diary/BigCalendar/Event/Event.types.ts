export interface IEvent {
  id: string;
  start: Date;
  end: Date;
  status: string;
  statusCode: string;
  direction: string;
  chapter: string;
}
export interface IEventProps {
  event: IEvent;
  title: string;
  status?: string;
}
