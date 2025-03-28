import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currentMonth } from '@shared/ui';
import { defaultReportsState } from '@store/root.data';
import { InvoiceSidx } from '@store/root.types';
import { InvoiceFilters } from '@views/BaseAccess/BaseAccessPage.types';
import dayjs from 'dayjs';

import {
  FinanceComputedPropertyState,
  FinanceReportsType,
  IFinanceInitialState,
  IResetFinanceFilterAction,
  IResetReportsFilterState,
  IServices,
  IServicesSortsAction,
  ISetPaginationActionState,
  ISetReconciliationData,
  ISetReconciliationDateParam,
  ISetReportsDataActionState,
  ISetReportsFiltersState,
  ISetReportsPageActionState,
  ISetReportsSortActionState,
  ReconciliationParam,
  SetServicesActsListActionType,
} from './finance.types';

export const financeSliceName = 'finance';
export const typeFactoringLoad = 18;
export const typeGetFactoringLoad = 19;

const initialState: IFinanceInitialState = {
  [FinanceComputedPropertyState.RECONCILIATION]: {
    filters: {
      [ReconciliationParam.START_DATE]: currentMonth.firstDay,
      [ReconciliationParam.END_DATE]: currentMonth.lastDay,
    },
    data: [],
    page: 1,
    rows: 10,
    records: 0,
  },
  [FinanceComputedPropertyState.SERVICES]: {
    dataList: [],
    records: 0,
    rows: 10,
    page: 1,
    sorts: {
      dateSort: 'desc',
      sidx: 'inv-date',
    },
    filters: {
      startDate: dayjs().subtract(1, 'year'),
      endDate: dayjs(),
      [InvoiceFilters.ORDER_CODE]: '',
      [InvoiceFilters.STATUS]: [],
    },
  },
  [FinanceComputedPropertyState.FACTORING]: structuredClone(defaultReportsState),
};

const financeSlice = createSlice({
  name: financeSliceName,
  initialState,
  reducers: {
    // reports
    setReportsData: (state, action: PayloadAction<ISetReportsDataActionState>) => {
      const { data, records, computedProperty } = action.payload;
      state[computedProperty].loadedData.data = data;
      state[computedProperty].loadedData.records = records;
    },
    setReportsPagination: (state, action: PayloadAction<ISetReportsPageActionState>) => {
      const { page, computedProperty, rows } = action.payload;
      state[computedProperty].page = page;
      state[computedProperty].rows = rows;
    },
    setReportsSort: (state, action: PayloadAction<ISetReportsSortActionState>) => {
      const { sortStatus, sortDate, sidx, computedProperty } = action.payload;
      state[computedProperty].sortDate = sortDate;
      state[computedProperty].sortStatus = sortStatus;
      state[computedProperty].sidx = sidx;
    },
    setReportsUpdate: (state, action: PayloadAction<FinanceReportsType>) => {
      state[action.payload].update = state[action.payload]['update'] + 1;
    },
    setReportsFilters: (state, action: PayloadAction<ISetReportsFiltersState>) => {
      const { filters, computedProperty } = action.payload;
      state[computedProperty].filters = { ...state[computedProperty].filters, ...filters };
      state[computedProperty].page = initialState[computedProperty].page;
    },
    resetReportsData: (state, action: PayloadAction<FinanceReportsType>) => {
      state[action.payload] = { ...initialState[action.payload], update: state[action.payload]['update'] + 1 };
    },
    resetReportsFilter: (state, action: PayloadAction<IResetReportsFilterState>) => {
      const { computedProperty, key } = action.payload;
      state[computedProperty].filters = {
        ...state[computedProperty].filters,
        [key]: initialState[computedProperty].filters[key],
      };
    },
    resetReportsFilters: (state, action: PayloadAction<FinanceReportsType>) => {
      const computedProperty = action.payload;
      state[computedProperty].filters = initialState[action.payload].filters;
      state[computedProperty].page = initialState[action.payload].page;
      state[computedProperty].sortDate = initialState[action.payload].sortDate;
      state[computedProperty].sortStatus = initialState[action.payload].sortStatus;
      state[computedProperty].sidx = initialState[action.payload].sidx;
    },
    //reconciliation
    setReconciliationData: (state, action: PayloadAction<ISetReconciliationData>) => {
      const { data, records } = action.payload;
      state.reconciliation.data = data;
      state.reconciliation.records = records;
    },
    setReconciliationPagination: (state, action: PayloadAction<ISetPaginationActionState>) => {
      const { page, rows } = action.payload;
      state.reconciliation.page = page;
      state.reconciliation.rows = rows;
    },
    setReconciliationDateParam: (state, action: PayloadAction<ISetReconciliationDateParam>) => {
      const { startDate, endDate } = action.payload;
      state.reconciliation.filters.startDate = startDate;
      state.reconciliation.filters.endDate = endDate;
    },
    resetReconciliationFilters: (state) => {
      state.reconciliation.filters = initialState.reconciliation.filters;
      state.reconciliation.page = initialState.reconciliation.page;
    },
    // services
    setServicesActsList: (state, action: PayloadAction<SetServicesActsListActionType>) => {
      const { dataList, records } = action.payload;
      state.services.dataList = dataList;
      state.services.records = records;
    },
    setServicesPagination: (state, action: PayloadAction<ISetPaginationActionState>) => {
      const { page, rows } = action.payload;
      state.services.page = page;
      state.services.rows = rows;
    },
    setServicesSorts: (state, action: PayloadAction<IServicesSortsAction>) => {
      const { column, order } = action.payload;
      state.services.sorts[column] = order;
      state.services.sorts.sidx = InvoiceSidx[column];
    },
    setServicesFilters: (state, action: PayloadAction<IServices['filters']>) => {
      state.services.filters = { ...state.services.filters, ...action.payload };
      state.services.page = initialState.services.page;
    },
    resetServicesFilters: (state) => {
      state.services.filters = initialState.services.filters;
      state.services.sorts = initialState.services.sorts;
      state.services.page = initialState.services.page;
    },
    resetServicesFilter: (state, action: PayloadAction<IResetFinanceFilterAction>) => {
      const { key, value } = action.payload;
      switch (key) {
        case InvoiceFilters.DATE_RANGE: {
          state.services.filters.endDate = initialState.services.filters.endDate;
          state.services.filters.startDate = initialState.services.filters.startDate;
          break;
        }
        case InvoiceFilters.STATUS: {
          state.services.filters.status = state.services.filters.status.filter((code) => code !== value);
          break;
        }
        default: {
          state.services.filters[key] = initialState.services.filters[key];
          break;
        }
      }
    },
  },
});

export const {
  actions: {
    setReportsData,
    setReconciliationData,
    setReconciliationPagination,
    setReconciliationDateParam,
    resetReconciliationFilters,
    setServicesPagination,
    setServicesSorts,
    setServicesFilters,
    setReportsPagination,
    setReportsSort,
    setReportsUpdate,
    setReportsFilters,
    resetServicesFilters,
    resetServicesFilter,
    resetReportsData,
    resetReportsFilter,
    resetReportsFilters,
  },
  reducer: financeStateReducer,
} = financeSlice;
