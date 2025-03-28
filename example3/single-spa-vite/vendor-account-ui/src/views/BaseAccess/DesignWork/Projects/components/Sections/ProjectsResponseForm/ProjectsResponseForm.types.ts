import { IProjectDetailsResponsibleData } from '@app/store/project/project.types';
import { Dayjs } from 'dayjs';

import { ProjectResponseFields } from './ProjectsResponseForm.data';

export interface ProjectsResponseFormProps {
  lprList: IProjectDetailsResponsibleData[];
  responsible: string;
  id: string;
  extCode: string;
  extStatus: string;
  extDateChange: string;
  extDateCreate: string;
  statusList: string[];
}

export interface InitialValues {
  [ProjectResponseFields.RESPONSIBLE]: string;
  [ProjectResponseFields.EXT_CODE]: string;
  [ProjectResponseFields.CURRENT_STATUS]: string;
  [ProjectResponseFields.DATE_CREATE]: Dayjs | null;
  [ProjectResponseFields.DATE_CHANGE]: Dayjs | null;
}
