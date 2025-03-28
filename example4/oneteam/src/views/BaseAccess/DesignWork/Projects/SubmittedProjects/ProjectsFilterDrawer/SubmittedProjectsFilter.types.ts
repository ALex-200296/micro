import { IProjectFiltersBase } from '@app/store/project/project.types';
import { IFormItemProps } from '@shared/ui';
import { Dayjs } from 'dayjs';

export const SubmittedProjectsFormValues = {
  extCode: 'extCode',
  mnfDCode: 'mnfDCode',
  prjName: 'prjName',
  prjSupply: 'prjSupply',
  exmManCode: 'exmManCode',
  subPrjStatus: 'subPrjStatus',
  prjAddr: 'prjAddr',
} as const;

export type ProjectFiltersFieldsTypes = {
  [key in keyof typeof SubmittedProjectsFormValues]: Omit<IFormItemProps, 'children' | 'label'> & {
    label: string;
  };
};

export interface ISubmittedProjectsFilterProps extends IProjectFiltersBase {
  afterSubmit: () => void;
}

export interface IProjectFiltersInitialValues extends Partial<Omit<IProjectFiltersBase, 'prjSupply'>> {
  prjSupply: Dayjs | null;
  addressSearch: string;
}
