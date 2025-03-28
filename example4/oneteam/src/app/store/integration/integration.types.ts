import { IReportsFilesData } from '@middleware/reports/reports.types';
import { IDefaultReportsState, ReportsFilter, SortOrderType } from '@store/root.types';

export const IntegrationComputedProperty = {
  Edi: 'edi',
  Uzedo: 'uzedo',
  EdiProject: 'EdiProject',
  AppApi: 'AppApi',
} as const;

export interface IIntegrationState {
  [IntegrationComputedProperty.Edi]: Omit<IDefaultReportsState, 'reportsData'>;
  [IntegrationComputedProperty.Uzedo]: Omit<IDefaultReportsState, 'reportsData'>;
  [IntegrationComputedProperty.EdiProject]: Omit<IDefaultReportsState, 'reportsData'>;
  [IntegrationComputedProperty.AppApi]: Omit<IDefaultReportsState, 'reportsData'>;
}

export type IntegrationComputedPropertyKeyType =
  (typeof IntegrationComputedProperty)[keyof typeof IntegrationComputedProperty];

export interface ISetReportsDataActionPayload {
  records: number;
  data: IReportsFilesData[];
  computedProperty: IntegrationComputedPropertyKeyType;
}

export interface ISetReportsPageActionPayload {
  page: number;
  rows: number;
  computedProperty: IntegrationComputedPropertyKeyType;
}

export interface ISetReportsFilesSortActionPayload {
  sortStatus: SortOrderType;
  sortDate: SortOrderType;
  sidx: string;
  computedProperty: IntegrationComputedPropertyKeyType;
}

export interface ISetReportsFiltersState {
  filters: Partial<IDefaultReportsState['filters']>;
  computedProperty: IntegrationComputedPropertyKeyType;
}

export interface IResetReportsFilterState {
  computedProperty: IntegrationComputedPropertyKeyType;
  key: keyof typeof ReportsFilter;
}
