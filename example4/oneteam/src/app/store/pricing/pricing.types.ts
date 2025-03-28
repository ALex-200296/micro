import { IReportsFilesData } from '@middleware/reports/reports.types';
import { IDefaultReportsState, ReportsFilter, SortOrderType } from '@store/root.types';

export const PricingComputedPropertyState = {
  priceLoad: 'priceLoad',
  pricelistLoad: 'pricelistLoad',
  discountsLoad: 'discountsLoad',
} as const;

export interface ISetReportsDataActionState {
  records: number;
  data: IReportsFilesData[];
  computedProperty: keyof typeof PricingComputedPropertyState;
}

export interface ISetReportsPageActionState {
  page: number;
  rows: number;
  computedProperty: keyof typeof PricingComputedPropertyState;
}

export interface ISetReportsSortActionState {
  sortStatus: SortOrderType;
  sortDate: SortOrderType;
  sidx: string;
  computedProperty: keyof typeof PricingComputedPropertyState;
}

export interface IResetReportsFilterState {
  computedProperty: keyof typeof PricingComputedPropertyState;
  key: keyof typeof ReportsFilter;
}

export interface ISetReportsFiltersState {
  filters: Partial<IDefaultReportsState['filters']>;
  computedProperty: keyof typeof PricingComputedPropertyState;
}
