import { Dayjs } from 'dayjs';

import { IEmployeesValues } from '../Common/Employees/Employees.types';

export const OtherDirectionsKey = {
  supplierStartDate: 'supplierStartDate',
  employees: 'employees',
} as const;

export interface IOtherDirectionsValues {
  [OtherDirectionsKey.supplierStartDate]: Dayjs | null;
  [OtherDirectionsKey.employees]: Record<string, IEmployeesValues>;
}
