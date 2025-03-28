import { IReportsData } from '@middleware/reports/reports.types';

export interface ISetReportsActionState {
  data: IReportsData[];
  records: number;
  total: number;
}

export interface IAnalyticsState {
  reportsData: {
    data: IReportsData[];
    records: number;
    total: number;
    page: number;
    rows: number;
  };
}

export interface ISetAnalyticsPagination {
  page: number;
  rows: number;
}
