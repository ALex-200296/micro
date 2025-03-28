import React from 'react';;
import { FilterDataType } from '@shared/lib/types';
import { getSortingForActions } from '@shared/lib/utils';
import { SortOrder } from 'antd/es/table/interface';

import { ISortData } from './useOnTableChange.types';

export const getSortData = (column?: React.Key, order?: SortOrder): ISortData => {
  switch (column) {
    case 'datetime':
      return { sidx: column.toString(), sortDate: getSortingForActions(order), sortStatus: '' };
    case 'state':
      return { sidx: column.toString(), sortStatus: getSortingForActions(order), sortDate: '' };
    case 'name':
      return { sidx: 'gds-name', sortStatus: getSortingForActions(order), sortDate: '' };
    case 'gdsCode':
      return { sidx: 'gds-code', sortStatus: getSortingForActions(order), sortDate: '' };
    default:
      return { sidx: 'datetime', sortStatus: '', sortDate: 'desc' };
  }
};

export const getFilterData = (data: FilterDataType) =>
  Object.fromEntries(Object.entries(data).map(([filterKey, filterValue]) => [filterKey, filterValue?.[0] || '']));
