import { ReportsFilter } from '@store/root.types';
import { Dayjs } from 'dayjs';

export const InvoiceFilters = {
  dateRange: 'dateRange',
  status: 'status',
  orderCode: 'orderCode',
} as const;

export const FilterLabels = {
  [ReportsFilter.date]: 'Дата обновления',
  [ReportsFilter.status]: 'Статус',
} as const;

export interface IInitialFiltersValues {
  [ReportsFilter.date]: Dayjs | null;
  [ReportsFilter.status]: string;
}

export interface IInvoiceFiltersInitialValues {
  [InvoiceFilters.dateRange]: [Dayjs, Dayjs];
  [InvoiceFilters.status]: string[];
  [InvoiceFilters.orderCode]: string;
}

export interface IReportsFilterConfig {
  [ReportsFilter.date]: string;
  [ReportsFilter.status]: string;
}

export interface IDescription {
  descr: string;
  path: string;
  name: string;
}
