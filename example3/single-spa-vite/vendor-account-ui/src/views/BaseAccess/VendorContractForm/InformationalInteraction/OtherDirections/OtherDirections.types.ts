import { Dayjs } from 'dayjs';

import { IEmployeesValues } from '../Common/Employees/Employees.types';

export const OtherDirectionsKey = {
  SUPPLIER_START_DATE: 'supplierStartDate',
  EMPLOYEES: 'employees',
} as const;

export interface IOtherDirectionsValues {
  [OtherDirectionsKey.SUPPLIER_START_DATE]: Dayjs | null;
  [OtherDirectionsKey.EMPLOYEES]: Record<string, IEmployeesValues>;
}
