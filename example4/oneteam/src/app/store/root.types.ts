import { IReportsFiles, IReportsFilesData } from '@middleware/reports/reports.types';

export type SortOrderType = 'asc' | 'desc' | '';

export const ReportsFilter = {
  date: 'date',
  status: 'status',
} as const;

export interface IDefaultReportsState {
  page: number;
  rows: number;
  sortStatus: SortOrderType;
  sortDate: SortOrderType;
  sidx: string;
  update: number;
  filters: {
    [ReportsFilter.date]: null | string;
    [ReportsFilter.status]: string;
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
  dateSort: 'inv-date',
} as const;
