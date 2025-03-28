import { NamePath } from 'antd/es/form/interface';

import { IInitialValues, IStepContent } from '../../../VendorContractForm.types';

export const EmployeesKey = {
  FIO: 'fio',
  POSITION: 'position',
  PHONE_OR_EMAIL: 'phoneOrEmail',
} as const;

export interface IEmployeesValues {
  [EmployeesKey.FIO]: string;
  [EmployeesKey.POSITION]: string;
  [EmployeesKey.PHONE_OR_EMAIL]: string;
}

export interface IDataSourceValue extends IEmployeesValues {
  id: string[];
}

export interface IEmployeesProps extends IStepContent {
  tableTitle: string;
  pathValues: NamePath<IInitialValues>;
}
