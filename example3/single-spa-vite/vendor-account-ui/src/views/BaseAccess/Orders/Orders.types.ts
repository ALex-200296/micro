import { InvoiceOperations } from '@middleware/invoice/invoice.types';

export const Filters = {
  DATE_RANGE: 'dateRange',
  STATUS: 'status',
  ORDER_CODE: 'orderCode',
} as const;

export type InitialOperationStateType = Record<keyof typeof InvoiceOperations, boolean>;
export interface IOperationArgs extends Record<string, any> {
  id: string;
}
export type OnOperationType = (key: keyof typeof InvoiceOperations, operationArgs: IOperationArgs) => void;
export type OperationsMapperType = Partial<Record<keyof typeof InvoiceOperations, (operationArgs: IOperationArgs) => void>>
