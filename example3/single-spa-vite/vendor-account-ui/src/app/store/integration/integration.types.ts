import { IReportsFilesData } from '@middleware/reports/reports.types';
import { IDefaultReportsState, ReportsFilter, SortOrderType } from '@store/root.types';

export const IntegrationComputedProperty = {
  EDI: 'edi',
  UZEDO: 'uzedo',
  EDI_PROJECT: 'EdiProject',
  APP_API: 'AppApi',
} as const;

export interface IIntegrationState {
  [IntegrationComputedProperty.EDI]: Omit<IDefaultReportsState, 'reportsData'>;
  [IntegrationComputedProperty.UZEDO]: Omit<IDefaultReportsState, 'reportsData'>;
  [IntegrationComputedProperty.EDI_PROJECT]: Omit<IDefaultReportsState, 'reportsData'>;
  [IntegrationComputedProperty.APP_API]: Omit<IDefaultReportsState, 'reportsData'>;
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
