import { IProjectFiltersBase } from '@app/store/project/project.types';
import { IFormItemProps } from '@shared/ui';
import { Dayjs } from 'dayjs';

export const SubmittedProjectsFormValues = {
  EXT_CODE: 'extCode',
  MNF_D_CODE: 'mnfDCode',
  PRJ_NAME: 'prjName',
  PRJ_SUPPLY: 'prjSupply',
  EXM_MAN_CODE: 'exmManCode',
  SUB_PRJ_STATUS: 'subPrjStatus',
  PRJ_ADDR: 'prjAddr',
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
