import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultReportsState } from '@store/root.data';

import {
  IIntegrationState,
  IntegrationComputedProperty,
  IntegrationComputedPropertyKeyType,
  IResetReportsFilterState,
  ISetReportsDataActionPayload,
  ISetReportsFilesSortActionPayload,
  ISetReportsFiltersState,
  ISetReportsPageActionPayload,
} from './integration.types';

export const integrationSliceName = 'integration';
export const typeEdi = 15;
export const typeUzedo = 16;
export const typeEdiProject = 17;
export const typeAppApi = 22;

const initialState: IIntegrationState = {
  [IntegrationComputedProperty.Edi]: structuredClone(defaultReportsState),
  [IntegrationComputedProperty.Uzedo]: structuredClone(defaultReportsState),
  [IntegrationComputedProperty.EdiProject]: structuredClone(defaultReportsState),
  [IntegrationComputedProperty.AppApi]: structuredClone(defaultReportsState),
};

const integrationSlice = createSlice({
  name: integrationSliceName,
  initialState,
  reducers: {
    setReportsData: (state, action: PayloadAction<ISetReportsDataActionPayload>) => {
      const { data, records, computedProperty } = action.payload;

      state[computedProperty].loadedData.data = data;
      state[computedProperty].loadedData.records = records;
    },
    setReportsPagination: (state, action: PayloadAction<ISetReportsPageActionPayload>) => {
      const { page, computedProperty, rows } = action.payload;
      state[computedProperty].page = page;
      state[computedProperty].rows = rows;
    },
    setReportsSort: (state, action: PayloadAction<ISetReportsFilesSortActionPayload>) => {
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
    setReportsUpdate: (state, action: PayloadAction<IntegrationComputedPropertyKeyType>) => {
      state[action.payload].update = state[action.payload]['update'] + 1;
    },
    resetReportsData: (state, action: PayloadAction<IntegrationComputedPropertyKeyType>) => {
      state[action.payload] = { ...initialState[action.payload], update: state[action.payload]['update'] + 1 };
    },
    resetReportsFilter: (state, action: PayloadAction<IResetReportsFilterState>) => {
      const { computedProperty, key } = action.payload;
      state[computedProperty].filters = {
        ...state[computedProperty].filters,
        [key]: initialState[computedProperty].filters[key],
      };
    },
    resetReportsFilters: (state, action: PayloadAction<IntegrationComputedPropertyKeyType>) => {
      state[action.payload].filters = initialState[action.payload].filters;
      state[action.payload].page = initialState[action.payload].page;
      state[action.payload].sortDate = initialState[action.payload].sortDate;
      state[action.payload].sortStatus = initialState[action.payload].sortStatus;
      state[action.payload].sidx = initialState[action.payload].sidx;
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
    resetReportsData,
    resetReportsFilter,
    resetReportsFilters,
  },
  reducer: integrationStateReducer,
} = integrationSlice;
