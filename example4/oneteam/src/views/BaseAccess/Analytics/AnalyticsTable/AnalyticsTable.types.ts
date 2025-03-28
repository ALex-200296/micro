import { IReportsData } from '@middleware/reports/reports.types';

export interface ITableProps {
  page: number;
  rows: number;
  records: number;
}

export interface ITableCellsProps {
  row: IReportsData;
}
