import { NamePath } from 'antd/es/form/interface';

import { IInitialValues, IStepContent } from '../../../VendorContractForm.types';

export const EmployeesKey = {
  fio: 'fio',
  position: 'position',
  phoneOrEmail: 'phoneOrEmail',
} as const;

export interface IEmployeesValues {
  [EmployeesKey.fio]: string;
  [EmployeesKey.position]: string;
  [EmployeesKey.phoneOrEmail]: string;
}

export interface IDataSourceValue extends IEmployeesValues {
  id: string[];
}

export interface IEmployeesProps extends IStepContent {
  tableTitle: string;
  pathValues: NamePath<IInitialValues>;
}
