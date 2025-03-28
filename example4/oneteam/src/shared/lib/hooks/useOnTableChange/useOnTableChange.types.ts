import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { SortOrderType as ApiSortOrder } from '@store/root.types';

export interface IOnTableChangeHookArgs {
  onSort?: ActionCreatorWithPayload<any>;
  onPaginate?: ActionCreatorWithPayload<any>;
  onFilter?: ActionCreatorWithPayload<any>;
  computedProperty?: string;
  args?: {
    sort?: Record<string, any>;
    pagination?: Record<string, any>;
    filter?: Record<string, any>;
  };
}

export interface ISortData {
  sidx: string;
  sortDate: ApiSortOrder;

  sortStatus: ApiSortOrder;
}
