import { IReportsFilesData } from '@middleware/reports/reports.types';
import { IDefaultReportsState, ReportsFilter, SortOrderType } from '@store/root.types';

export const LogisticsComputedPropertyState = {
  STORAGE_ASSORTMENT: 'storageAssortment',
  GOODS_STATUS: 'goodsStatus',
  TIMELINES: 'timelines',
} as const;

export interface ILogisticsState {
  storageAssortment: IDefaultReportsState;
  goodsStatus: IDefaultReportsState;
  timelines: IDefaultReportsState;
}

interface ILogisticsActionState {
  computedProperty: keyof typeof LogisticsComputedPropertyState;
}

export interface ISetReportsDataActionState extends ILogisticsActionState {
  records: number;
  data: IReportsFilesData[];
}

export interface ISetReportsPageActionState extends ILogisticsActionState {
  page: number;
  rows: number;
}

export interface ISetReportsSortActionState extends ILogisticsActionState {
  sortDate: SortOrderType;
  sidx: string;
  sortStatus: SortOrderType;
}

export interface ISetReportsFiltersState {
  filters: Partial<IDefaultReportsState['filters']>;
  computedProperty: keyof typeof LogisticsComputedPropertyState;
}

export interface IResetReportsFilterState {
  computedProperty: keyof typeof LogisticsComputedPropertyState;
  key: keyof typeof ReportsFilter;
}
