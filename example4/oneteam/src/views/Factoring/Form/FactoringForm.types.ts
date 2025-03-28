import { IUuidData } from '@middleware/reports/reports.types';
import { FileType } from '@shared/lib';
import { IFormItemProps } from '@shared/ui';

export interface IFactoringFormState extends IUuidData {
  files: FileType;
}

export interface IFieldsPropsState {
  orgName?: Omit<IFormItemProps, 'children'>;
  orgInn?: Omit<IFormItemProps, 'children'>;
  orgKpp?: Omit<IFormItemProps, 'children'>;
  loginFio?: Omit<IFormItemProps, 'children'>;
  files?: Omit<IFormItemProps, 'children'>;
}
