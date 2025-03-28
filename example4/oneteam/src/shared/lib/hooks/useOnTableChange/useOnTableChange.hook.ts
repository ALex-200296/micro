import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getSortingForActions } from '@shared/lib';
import { IOnChangeData } from '@shared/lib/types';

import { getFilterData, getSortData } from './useOnTableChange.data';
import { IOnTableChangeHookArgs } from './useOnTableChange.types';

export const useOnTableChange = ({ onSort, onPaginate, onFilter, computedProperty, args }: IOnTableChangeHookArgs) => {
  const dispatch = useDispatch();
  return useCallback((onChangeData: IOnChangeData) => {
    const {
      action,
      sort: { column, order },
      pagination: { page, rows },
      filter,
    } = onChangeData;
    if (action === 'sort' && onSort) {
      dispatch(
        onSort({
          ...(computedProperty
            ? { ...getSortData(column, order), computedProperty, ...args?.sort }
            : { column, order: getSortingForActions(order), sidx: column, ...args?.sort }),
        }),
      );
    }
    if (action === 'paginate' && onPaginate) {
      dispatch(onPaginate({ page, rows, computedProperty, ...args?.pagination }));
    }
    if (action === 'filter' && onFilter) {
      const filterData = getFilterData(filter);
      dispatch(onFilter(filterData));
    }
  }, []);
};
