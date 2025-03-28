import { IInfoSearchState } from '@app/store/info/info.types';
import { IUpdateCalendarTaskActionState } from '@middleware/calendar/calendar.types';

import { IEventFormProps } from '../EventForm/EventForm.types';

export interface IEventCreationFormProps
  extends Partial<Pick<Omit<IEventFormProps, 'subThemeOptions'>, 'disabledFields' | 'visibleFields'>> {
  onClose: () => void;
  subThemeOptions?: IInfoSearchState[];
  updateFilters?: IUpdateCalendarTaskActionState['getEvents'];
}

export interface IEventCreationDrawerProps extends IEventCreationFormProps {
  isOpen: boolean;
}
