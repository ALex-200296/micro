import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dashedFormat } from '@shared/ui/atoms/Inputs/DatePicker/DatePicker.formats';
import { IInitialFiltersValues } from '@views/BaseAccess/BaseAccessPage.types';
import dayjs from 'dayjs';

import { getReportsFilterFormItems } from './useReportsPageFilters.data';
import { IUseReportsPageFilters } from './useReportsPageFilters.types';

export const useReportsPageFilters = ({
  dataSelector,
  computedProperty,
  afterFiltersSubmit,
  setReportsFiltersType,
  resetReportsFiltersType,
}: IUseReportsPageFilters) => {
  const dispatch = useDispatch();

  const statusFilterOptions = useSelector(dataSelector);
  const filtersFormItem = useMemo(() => getReportsFilterFormItems(statusFilterOptions), [statusFilterOptions]);

  const onFilterFinish = useCallback((value: Partial<IInitialFiltersValues>) => {
    dispatch({
      type: setReportsFiltersType,
      payload: {
        filters: { date: value.date ? dayjs(value.date).format(dashedFormat) : null, status: value.status || '' },
        computedProperty,
      },
    }),
      afterFiltersSubmit?.();
  }, []);

  const handleFiltersReset = useCallback(() => {
    dispatch({ type: resetReportsFiltersType, payload: computedProperty });
  }, []);

  return { filtersFormItem, statusFilterOptions, onFilterFinish, handleFiltersReset };
};
