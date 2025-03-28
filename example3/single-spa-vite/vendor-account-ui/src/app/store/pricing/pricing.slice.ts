import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultReportsState } from '@store/root.data';
import { IDefaultReportsState } from '@store/root.types';

import {
  IResetReportsFilterState,
  ISetReportsDataActionState,
  ISetReportsFiltersState,
  ISetReportsPageActionState,
  ISetReportsSortActionState,
  PricingComputedPropertyState,
} from './pricing.types';

export const pricingSliceName = 'pricing';

export const typePriceLoad = 11;
export const typePriceListsLoad = 20;
export const typeDiscountsLoad = 21;

const initialState: Record<keyof typeof PricingComputedPropertyState, IDefaultReportsState> = {
  [PricingComputedPropertyState.PRICE_LOAD]: structuredClone(defaultReportsState),
  [PricingComputedPropertyState.PRICELIST_LOAD]: structuredClone(defaultReportsState),
  [PricingComputedPropertyState.DISCOUNTS_LOAD]: structuredClone(defaultReportsState),
};

const pricingSlice = createSlice({
  name: pricingSliceName,
  initialState,
  reducers: {
    setReportsData: (state, action: PayloadAction<ISetReportsDataActionState>) => {
      const { data, records, computedProperty } = action.payload;

      state[computedProperty].loadedData.data = data;
      state[computedProperty].loadedData.records = records;
    },
    resetReportsFilter: (state, action: PayloadAction<IResetReportsFilterState>) => {
      const { computedProperty, key } = action.payload;
      state[computedProperty].filters = {
        ...state[computedProperty].filters,
        [key]: initialState[computedProperty].filters[key],
      };
    },
    resetReportsFilters: (state, action: PayloadAction<keyof typeof PricingComputedPropertyState>) => {
      const computedProperty = action.payload;
      state[computedProperty].filters = initialState[action.payload].filters;
      state[computedProperty].page = initialState[action.payload].page;
      state[computedProperty].sortDate = initialState[action.payload].sortDate;
      state[computedProperty].sortStatus = initialState[action.payload].sortStatus;
      state[computedProperty].sidx = initialState[action.payload].sidx;
    },
    setReporsSort: (state, action: PayloadAction<ISetReportsSortActionState>) => {
      const { sortStatus, sortDate, sidx, computedProperty } = action.payload;

      state[computedProperty].sortDate = sortDate;
      state[computedProperty].sortStatus = sortStatus;
      state[computedProperty].sidx = sidx;
    },
    setReportsFilters: (state, action: PayloadAction<ISetReportsFiltersState>) => {
      const { filters, computedProperty } = action.payload;
      state[computedProperty].filters = { ...state[computedProperty].filters, ...filters };
      state[computedProperty].page = initialState[computedProperty].page;
    },
    setReportsPagination: (state, action: PayloadAction<ISetReportsPageActionState>) => {
      const { page, computedProperty, rows } = action.payload;
      state[computedProperty].page = page;
      state[computedProperty].rows = rows;
    },
    setReportsUpdate: (state, action: PayloadAction<keyof typeof PricingComputedPropertyState>) => {
      state[action.payload].update = state[action.payload]['update'] + 1;
    },
  },
});

export const {
  actions: {
    resetReportsFilter,
    resetReportsFilters,
    setReporsSort,
    setReportsFilters,
    setReportsPagination,
    setReportsUpdate,
  },
  reducer: pricingReducer,
} = pricingSlice;
