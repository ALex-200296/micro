import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultReportsState } from '@store/root.data';

import {
  ILogisticsState,
  IResetReportsFilterState,
  ISetReportsDataActionState,
  ISetReportsFiltersState,
  ISetReportsPageActionState,
  ISetReportsSortActionState,
  LogisticsComputedPropertyState,
} from './logistics.types';

export const logisticsSliceName = 'logistics';

export const typeStorageAssortment = 8;
export const typeGoodsStatus = 9;
export const typeTimelines = 10;

const initialState: ILogisticsState = {
  [LogisticsComputedPropertyState.STORAGE_ASSORTMENT]: structuredClone(defaultReportsState),
  [LogisticsComputedPropertyState.GOODS_STATUS]: structuredClone(defaultReportsState),
  [LogisticsComputedPropertyState.TIMELINES]: structuredClone(defaultReportsState),
};

const logisticsSlice = createSlice({
  name: logisticsSliceName,
  initialState,
  reducers: {
    setReportsData: (state, action: PayloadAction<ISetReportsDataActionState>) => {
      const { data, records, computedProperty } = action.payload;
      state[computedProperty].loadedData = { data, records };
    },
    setReportsPagination: (state, action: PayloadAction<ISetReportsPageActionState>) => {
      const { page, computedProperty, rows } = action.payload;
      state[computedProperty].page = page;
      state[computedProperty].rows = rows;
    },
    setReportsSort: (state, action: PayloadAction<ISetReportsSortActionState>) => {
      const { sortStatus, sortDate, sidx, computedProperty } = action.payload;
      state[computedProperty].sortStatus = sortStatus;
      state[computedProperty].sidx = sidx;
      state[computedProperty].sortDate = sortDate;
    },
    setReportsFilters: (state, action: PayloadAction<ISetReportsFiltersState>) => {
      const { filters, computedProperty } = action.payload;
      state[computedProperty].filters = { ...state[computedProperty].filters, ...filters };
      state[computedProperty].page = initialState[computedProperty].page;
    },
    setReportsUpdate: (state, action: PayloadAction<keyof typeof LogisticsComputedPropertyState>) => {
      state[action.payload].update = state[action.payload]['update'] + 1;
    },
    resetReportsFilter: (state, action: PayloadAction<IResetReportsFilterState>) => {
      const { computedProperty, key } = action.payload;
      state[computedProperty].filters = {
        ...state[computedProperty].filters,
        [key]: initialState[computedProperty].filters[key],
      };
    },
    resetReportsFilters: (state, action: PayloadAction<keyof typeof LogisticsComputedPropertyState>) => {
      const computedProperty = action.payload;

      state[computedProperty].filters = initialState[action.payload].filters;
      state[computedProperty].page = initialState[action.payload].page;

      state[computedProperty].sortDate = initialState[action.payload].sortDate;
      state[computedProperty].sortStatus = initialState[action.payload].sortStatus;
      state[computedProperty].sidx = initialState[action.payload].sidx;
    },
  },
});

export const {
  actions: {
    setReportsData,
    setReportsPagination,
    setReportsSort,
    setReportsFilters,
    setReportsUpdate,
    resetReportsFilter,
    resetReportsFilters,
  },
  reducer: logisticsStateReducer,
} = logisticsSlice;
