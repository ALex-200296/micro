import { ICalendarEventState } from '@app/store/calendar/calendar.types';
import { IInfoSearchState } from '@app/store/info/info.types';
import { IUsersLkpState } from '@app/store/user/user.types';
import { IUpdateCalendarTaskActionState } from '@middleware/calendar/calendar.types';
import { UploadFile } from 'antd';

import { EventKeys, IEventFormProps, IEventInitialValues } from '../EventForm/EventForm.types';

export type GetInitialValuesForUpdateType = (obj: ICalendarEventState & { usersLkp: IUsersLkpState[] }) => Omit<
  IEventInitialValues,
  'files'
> & {
  [EventKeys.files]?: { file: IEventInitialValues['files']['file']; fileList: UploadFile[] };
};

export interface EventUpdateFormProps
  extends Partial<
    Pick<Omit<IEventFormProps, 'subThemeOptions' | 'initialValues'>, 'disabledFields' | 'visibleFields'>
  > {
  onClose: () => void;
  initialValues: ICalendarEventState | null;
  setInitialValues?: (event: ICalendarEventState | null) => void;
  subThemeOptions?: IInfoSearchState[];
  updateFilters?: IUpdateCalendarTaskActionState['getEvents'];
}

export interface IEventUpdateDrawerProps extends EventUpdateFormProps {
  isOpen: boolean;
}
