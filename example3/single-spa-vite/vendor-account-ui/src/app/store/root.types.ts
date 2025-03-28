import { IReportsFiles, IReportsFilesData } from '@middleware/reports/reports.types';

export type SortOrderType = 'asc' | 'desc' | '';

export const ReportsFilter = {
  DATE: 'date',
  STATUS: 'status',
} as const;

export type ReportsFilterType = (typeof ReportsFilter)[keyof typeof ReportsFilter];

export interface IDefaultReportsState {
  page: number;
  rows: number;
  sortStatus: SortOrderType;
  sortDate: SortOrderType;
  sidx: string;
  update: number;
  filters: {
    [ReportsFilter.DATE]: null | string;
    [ReportsFilter.STATUS]: string;
  };
  loadedData: {
    records: number;
    data: IReportsFilesData[];
  };
  missingData: {
    records: number;
    data: IReportsFiles[];
    total: number;
    page: number;
  };
}

export const InvoiceSidx = {
  DATE_SORT: 'inv-date',
} as const;

export type InvoiceSidxType = (typeof InvoiceSidx)[keyof typeof InvoiceSidx];
