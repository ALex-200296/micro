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
  [ProjectResponseFields.responsible]: string;
  [ProjectResponseFields.extCode]: string;
  [ProjectResponseFields.currentStatus]: string;
  [ProjectResponseFields.dateCreate]: Dayjs | null;
  [ProjectResponseFields.dateChange]: Dayjs | null;
}
