import React from 'react';
import { IInfoSearchState } from '@app/store/info/info.types';
import { IOrderInvoiceBody, OrderInvoiceType, OrderListsType, OrderRowListsType } from '@app/store/orders/orders.types';
import { InvoiceOperations, InvoiceProcedure } from '@middleware/invoice/invoice.types';
import { ColumnType } from '@shared/ui';

import { InitialOperationStateType } from '../../Orders.types';

export const EditableColumn = {
  SUPPLIER_DATE: 'supplierDate',
  REJECTION_REASON: 'rejectionReason',
  PRODUCT_DIVISION: 'productDivision',
  COMMENT: 'comment',
} as const;

export const ColumnStatusCode = {
  [InvoiceOperations.MERCH_REJECT]: '212',
} as const;

export type ExpandableTitlePropsType = Omit<OrderInvoiceType, 'logisticCenter'> &
  Partial<Pick<IOrderInvoiceBody, 'volume' | 'weight'>>;

export type OperationColumnsConfigType = Partial<
  Record<keyof typeof InvoiceOperations, Partial<Record<keyof typeof EditableColumn, ColumnType<OrderRowListsType>>>>
>;

export type GetOperationColumnsConfig = ({
  columnValuesForAllRows,
  setCheckedRows,
  setColumnValuesForAllRows,
  statusRejectOptions,
}: {
  setCheckedRows?: React.Dispatch<React.SetStateAction<string[]>>;
  statusRejectOptions?: IInfoSearchState[];
  columnValuesForAllRows?: string[];
  setColumnValuesForAllRows?: React.Dispatch<React.SetStateAction<string[]>>;
}) => OperationColumnsConfigType;
export interface IExpandableOrderInfoProps {
  order: OrderListsType;
  expandedKey: string[];
  tableIsEditable: Record<string, Partial<InitialOperationStateType>>;
  onEditableFinish: (
    values: Record<string, Partial<OrderRowListsType>>,
    id: string,
    operation: keyof typeof InvoiceProcedure,
    datalist: OrderRowListsType[],
  ) => void;
  setTableIsEditable: React.Dispatch<React.SetStateAction<Record<string, Partial<InitialOperationStateType>>>>;
}

export type EditabelColulumnValuesType = OrderRowListsType & { supplierDateReject: string; supplierDateAcept: string };
