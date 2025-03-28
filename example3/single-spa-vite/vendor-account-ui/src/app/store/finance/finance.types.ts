import { IReturnAdapterInvoices } from '@middleware/invoice/invoice.types';
import { IReportsFilesData } from '@middleware/reports/reports.types';
import { IDefaultReportsState, InvoiceSidx, InvoiceSidxType, ReportsFilter, ReportsFilterType, SortOrderType } from '@store/root.types';
import { InvoiceFilters } from '@views/BaseAccess/BaseAccessPage.types';
import { Dayjs } from 'dayjs';

export const FinanceComputedPropertyState = {
  RECONCILIATION: 'reconciliation',
  SERVICES: 'services',
  FACTORING: 'factoring',
} as const;

export type FinanceReportsType = typeof FinanceComputedPropertyState.FACTORING;

export type SetServicesActsListActionType = IReturnAdapterInvoices;

export interface IServicesSortsAction {
  column: InvoiceSidxType;
  order: SortOrderType;
  sidx: InvoiceSidxType;
}

export const ReconciliationParam = {
  START_DATE: 'startDate',
  END_DATE: 'endDate',
} as const

export interface IReconciliationData {
  Amount: number;
  Date: string;
  EndDate: string;
  ID: string;
  Number: string;
  PartnerCode: string;
  ReconciliationAgreed: boolean;
  StartDate: string;
  StatusEDO: string;
}

export interface IReconciliationState {
  filters: {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  };
  data: IReconciliationData[];
  page: number;
  rows: number;
  records: number;
}
export interface IServices extends IReturnAdapterInvoices {
  page: number;
  rows: number;
  sorts: {
    sidx: InvoiceSidxType;
    dateSort: SortOrderType;
  };
  filters: {
    startDate: Dayjs;
    endDate: Dayjs;
    [InvoiceFilters.ORDER_CODE]: string;
    [InvoiceFilters.STATUS]: string[];
  };
}
export interface IFinanceInitialState extends Record<FinanceReportsType, IDefaultReportsState> {
  [FinanceComputedPropertyState.RECONCILIATION]: IReconciliationState;
  [FinanceComputedPropertyState.SERVICES]: IServices;
}

export interface ISetReconciliationData {
  data: IReconciliationData[];
  records: number;
}

export interface ISetReconciliationDateParam {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

export interface IResetFinanceFilterAction {
  key: keyof typeof InvoiceFilters;
  value?: string;
}

export interface ISetReportsDataActionState {
  records: number;
  data: IReportsFilesData[];
  computedProperty: FinanceReportsType;
}

export interface ISetReportsFiltersState {
  filters: Partial<IDefaultReportsState['filters']>;
  computedProperty: FinanceReportsType;
}

export interface IResetReportsFilterState {
  computedProperty: FinanceReportsType;
  key: ReportsFilterType;
}

export interface ISetPaginationActionState {
  rows: number;
  page: number;
}

export interface ISetReportsPageActionState extends ISetPaginationActionState {
  computedProperty: FinanceReportsType;
}

export interface ISetReportsSortActionState {
  sortStatus: SortOrderType;
  sortDate: SortOrderType;
  sidx: string;
  computedProperty: FinanceReportsType;
}
