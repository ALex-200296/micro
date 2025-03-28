import { IEmployeesValues } from '../Common/Employees/Employees.types';

import { IUzedoTermValues, UzedoTermKey } from './UzedoTerm/UzedoTerm.types';

export const UzedoKey = {
  uzedoTerm: 'uzedoTerm',
  employees: 'employees',
} as const;

export interface IUzedoValues {
  [UzedoKey.uzedoTerm]: Record<keyof typeof UzedoTermKey, IUzedoTermValues>;
  [UzedoKey.employees]: Record<string, IEmployeesValues>;
}
