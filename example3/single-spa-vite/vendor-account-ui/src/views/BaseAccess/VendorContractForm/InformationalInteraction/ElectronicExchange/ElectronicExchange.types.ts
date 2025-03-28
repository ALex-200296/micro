import { IEmployeesValues } from '../Common/Employees/Employees.types';

import { IListMessagesValues, ListMessagesKey } from './ListMessages/ListMessages.types';

export const ElectronicExchangeKey = {
  LIST_MESSAGES: 'listMessages',
  EMPLOYEES: 'employees',
} as const;

export interface IElectronicExchangeValues {
  [ElectronicExchangeKey.LIST_MESSAGES]: Record<keyof typeof ListMessagesKey, IListMessagesValues>;
  [ElectronicExchangeKey.EMPLOYEES]: Record<string, IEmployeesValues>;
}
