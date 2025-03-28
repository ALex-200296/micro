import { IEmployeesValues } from '../Common/Employees/Employees.types';

import { IUzedoTermValues, UzedoTermKey } from './UzedoTerm/UzedoTerm.types';

export const UzedoKey = {
  UZEDO_TERM: 'uzedoTerm',
  EMPLOYEES: 'employees',
} as const;

export interface IUzedoValues {
  [UzedoKey.UZEDO_TERM]: Record<keyof typeof UzedoTermKey, IUzedoTermValues>;
  [UzedoKey.EMPLOYEES]: Record<string, IEmployeesValues>;
}
