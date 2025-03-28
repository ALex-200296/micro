import { IEmployeesValues } from '../Common/Employees/Employees.types';

import { IListMessagesValues, ListMessagesKey } from './ListMessages/ListMessages.types';

export const ElectronicExchangeKey = {
  listMessages: 'listMessages',
  employees: 'employees',
} as const;

export interface IElectronicExchangeValues {
  [ElectronicExchangeKey.listMessages]: Record<keyof typeof ListMessagesKey, IListMessagesValues>;
  [ElectronicExchangeKey.employees]: Record<string, IEmployeesValues>;
}
