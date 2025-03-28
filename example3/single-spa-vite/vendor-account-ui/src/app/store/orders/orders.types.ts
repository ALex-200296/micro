import {
  IReturnAdapterInvoice,
  IReturnAdapterInvoiceBody,
  IReturnAdapterInvoices,
  IReturnAdapterRowsInvoices,
} from '@middleware/invoice/invoice.types';
import { InvoiceSidx, SortOrderType } from '@store/root.types';
import { InvoiceFilters } from '@views/BaseAccess/BaseAccessPage.types';
import { Dayjs } from 'dayjs';

export const OrdersSidx = InvoiceSidx;

export const ExtendedSort = {
  REQUIRED_DELIVERY_DATE: 'requiredDeliveryDate',
} as const;

export type OrderListsType = IReturnAdapterRowsInvoices;
export type SetOrderListsActionStateType = IReturnAdapterInvoices;
export type OrderRowListsType = IReturnAdapterInvoiceBody;
export type OrderInvoiceType = IReturnAdapterInvoice;

export interface IOrderExtendedSort {
  [ExtendedSort.REQUIRED_DELIVERY_DATE]: SortOrderType;
}

export interface IOrderSortsAction {
  column: keyof typeof OrdersSidx;
  order: SortOrderType;
  sidx: keyof typeof OrdersSidx;
}

export interface IOrderInvoiceAction {
  id: string;
  invoice: OrderInvoiceType;
}

export interface IOrderInvoiceBodyAction {
  id: string;
  rows: OrderRowListsType[];
  volume: string;
  weight: string;
  docNum: string;
}

export interface ISetOrderInvoiceBodySortAction {
  id: string;
  column: keyof typeof ExtendedSort;
  order: SortOrderType;
}

export interface IOrderInvoiceBody {
  dataList: OrderRowListsType[];
  volume: string;
  weight: string;
  docNum: string;
  sorts: IOrderExtendedSort;
}

export interface IOrdersState {
  dataList: OrderListsType[];
  invoice: Record<string, OrderInvoiceType>;
  invoiceBody: Record<string, IOrderInvoiceBody>;
  invoiceBoxes: Record<string, OrderRowListsType[]>;
  page: number;
  rows: number;
  records: number;
  filters: {
    startDate: Dayjs;
    endDate: Dayjs;
    status: string[];
    orderCode: string;
  };
  sorts: {
    sidx: (typeof OrdersSidx)[keyof typeof OrdersSidx];
    dateSort: SortOrderType;
  };
}

export interface IResetOrdersFilterAction {
  key: keyof typeof InvoiceFilters;
  value?: string;
}

export interface ISetOrdersPaginationAction {
  page: number;
  rows: number;
}
