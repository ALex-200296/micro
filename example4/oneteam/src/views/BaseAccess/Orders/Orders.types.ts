import { invoiceOperations } from '@middleware/invoice/invoice.types';

export const Filters = {
  dateRange: 'dateRange',
  status: 'status',
  orderCode: 'orderCode',
} as const;

export type InitialOperationStateType = Record<keyof typeof invoiceOperations, boolean>;
export interface IOperationArgs extends Record<string, any> {
  id: string;
}
export type OnOperationType = (key: keyof typeof invoiceOperations, operationArgs: IOperationArgs) => void;
export type OperationsMapperType = Partial<Record<keyof typeof invoiceOperations, (operationArgs: IOperationArgs) => void>>
