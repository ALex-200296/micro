import { SortOrderType as ApiSortOrder } from '@store/root.types';
import { SortOrder } from 'antd/lib/table/interface';

export const getSortingForTable = (sort: ApiSortOrder): SortOrder => {
  switch (sort) {
    case 'asc':
      return 'ascend';
    case 'desc':
      return 'descend';
    default:
      return null;
  }
};

export const getSortingForActions = (sort?: SortOrder): ApiSortOrder => {
  switch (sort) {
    case 'ascend':
      return 'asc';
    case 'descend':
      return 'desc';
    default:
      return '';
  }
};
