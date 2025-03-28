import { ReportsFilter } from '@store/root.types';
import { Dayjs } from 'dayjs';

export const InvoiceFilters = {
  DATE_RANGE: 'dateRange',
  STATUS: 'status',
  ORDER_CODE: 'orderCode',
} as const;

export const FilterLabels = {
  [ReportsFilter.DATE]: 'Дата обновления',
  [ReportsFilter.STATUS]: 'Статус',
} as const;

export interface IInitialFiltersValues {
  [ReportsFilter.DATE]: Dayjs | null;
  [ReportsFilter.STATUS]: string;
}

export interface IInvoiceFiltersInitialValues {
  [InvoiceFilters.DATE_RANGE]: [Dayjs, Dayjs];
  [InvoiceFilters.STATUS]: string[];
  [InvoiceFilters.ORDER_CODE]: string;
}

export interface IReportsFilterConfig {
  [ReportsFilter.DATE]: string;
  [ReportsFilter.STATUS]: string;
}

export interface IDescription {
  descr: string;
  path: string;
  name: string;
}
