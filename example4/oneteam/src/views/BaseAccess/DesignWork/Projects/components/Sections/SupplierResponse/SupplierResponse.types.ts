import { IProjectDetailsResponsibleData } from '@app/store/project/project.types';
import { Dayjs } from 'dayjs';

export interface SupplierResponseProps {
  id: string;
  projectNumber: string;
  projectName: string;
  requestNumber: string;
  statusList: string[];
  currentStatus: string;
  comment: string;
  crmDate: string;
  dateCreate: string;
  dateChange: string;
  compMnf: string;
  lpr_list: IProjectDetailsResponsibleData[];
  responsible: string;
  afterSubmit: () => void;
}

export interface InitialValues {
  projectNumber: string;
  projectName: string;
  requestNumber: string;
  currentStatus: string;
  comment: string;
  crmDate: Dayjs | null;
  dateCreate: Dayjs | null;
  dateChange: Dayjs | null;
  responsible: string;
}
