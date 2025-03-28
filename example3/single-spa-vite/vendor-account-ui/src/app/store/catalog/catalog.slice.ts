import { IRSupplierResponse } from '@middleware/catalog/catalog.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultReportsState } from '@store/root.data';

import {
  CatalogComputedPropertyState,
  CatalogComputedPropertyStateType,
  GoodsListFilters,
  ICatalogFilters,
  ICatalogState,
  IGoodsListDataActionState,
  IGoodsListPageActionState,
  IGoodsListSorterActionState,
  IResetGoodsListFilterAction,
  IResetReportsFilterState,
  ISetReportsDataActionState,
  ISetReportsFilesDataActionState,
  ISetReportsFiltersState,
  ISetReportsPageActionState,
  ISetReportsSortActionState,
  IUnpublishedFilesDataActionState,
  NoIndexChecks,
  NoIndexChecksType,
} from './catalog.types';

export const catalogSliceName = 'catalog';
export const typeGoodsLoad = 2;
export const typeNewGoodsLoad = 3;
export const typeCertificatesLoad = 4;
export const typeImagesLoad = 5;
export const typeTechInfoLoad = 6;
export const typeDescriptionLoad = 7;
export const typeAnalogLoad = 12;
export const typeConstructorLoad = 13;
export const typeSametypeLoad = 14;

const initialState: ICatalogState = {
  [CatalogComputedPropertyState.GOODS_LOAD]: structuredClone(defaultReportsState),
  [CatalogComputedPropertyState.IMAGES_LOAD]: structuredClone(defaultReportsState),
  [CatalogComputedPropertyState.NEW_GOODS_LOAD]: structuredClone(defaultReportsState),
  [CatalogComputedPropertyState.CERTIFICATES_LOAD]: structuredClone(defaultReportsState),
  [CatalogComputedPropertyState.DESCRIPTION_LOAD]: structuredClone(defaultReportsState),
  [CatalogComputedPropertyState.TECH_INFO_LOAD]: structuredClone(defaultReportsState),
  [CatalogComputedPropertyState.PRICE_LOAD]: structuredClone(defaultReportsState),
  [CatalogComputedPropertyState.ANALOG_LOAD]: structuredClone(defaultReportsState),
  [CatalogComputedPropertyState.CONSTRUCTOR_LOAD]: structuredClone(defaultReportsState),
  [CatalogComputedPropertyState.SAME_TYPE_LOAD]: structuredClone(defaultReportsState),
  characteristicReports: {
    page: 1,
    rows: 10,
    records: 0,
    filesData: [],
  },
  goodsList: {
    listStatus: NoIndexChecks.NOT_CHECKED,
    data: [],
    records: 0,
    page: 1,
    rows: 10,
    sort: '',
    sortValue: '',
    unpublishedFiles: {
      page: 1,
      rows: 10,
      records: 0,
      unpublishedGoods: [],
    },
    filters: {
      [GoodsListFilters.NO_INDEX]: false,
      [GoodsListFilters.CATEGORY]: '',
      [GoodsListFilters.MANUFACTURER]: '',
      [GoodsListFilters.SERIES]: [],
      [GoodsListFilters.BRAND]: [],
      [GoodsListFilters.NAME]: '',
      [GoodsListFilters.ARTICLE]: '',
    },
  },
  configChars: {},
};
const catalogSlice = createSlice({
  name: catalogSliceName,
  initialState,
  reducers: {
    //reports
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
    setReporsSort: (state, action: PayloadAction<ISetReportsSortActionState>) => {
      const { sortStatus, sortDate, sidx, computedProperty } = action.payload;

      state[computedProperty].sortDate = sortDate;
      state[computedProperty].sortStatus = sortStatus;
      state[computedProperty].sidx = sidx;
    },
    setReportsUpdate: (state, action: PayloadAction<CatalogComputedPropertyStateType>) => {
      state[action.payload].update = state[action.payload]['update'] + 1;
    },
    setReportsFilters: (state, action: PayloadAction<ISetReportsFiltersState>) => {
      const { filters, computedProperty } = action.payload;
      state[computedProperty].filters = { ...state[computedProperty].filters, ...filters };
      state[computedProperty].page = initialState[computedProperty].page;
    },
    resetReportsData: (state, action: PayloadAction<CatalogComputedPropertyStateType>) => {
      state[action.payload] = {
        ...initialState[action.payload],
        rows: state[action.payload].rows,
        update: state[action.payload]['update'] + 1,
      };
    },
    resetReportsFilter: (state, action: PayloadAction<IResetReportsFilterState>) => {
      const { computedProperty, key } = action.payload;
      state[computedProperty].filters = {
        ...state[computedProperty].filters,
        [key]: initialState[computedProperty].filters[key],
      };
    },
    resetReportsFilters: (state, action: PayloadAction<CatalogComputedPropertyStateType>) => {
      const computedProperty = action.payload;
      state[computedProperty].filters = initialState[action.payload].filters;
      state[computedProperty].page = initialState[action.payload].page;
      state[computedProperty].sortDate = initialState[action.payload].sortDate;
      state[computedProperty].sortStatus = initialState[action.payload].sortStatus;
      state[computedProperty].sidx = initialState[action.payload].sidx;
    },

    //reports missing
    setMissingData: (state, action: PayloadAction<ISetReportsFilesDataActionState>) => {
      const { data, records, computedProperty, total, page } = action.payload;
      state[computedProperty].missingData = { data, records, total, page };
    },
    setCatalogMissingPage: (state, action: PayloadAction<Omit<ISetReportsPageActionState, 'rows'>>) => {
      const { page, computedProperty } = action.payload;
      state[computedProperty].missingData.page = page;
    },

    // characteriscts reports
    setCharacteristicReports: (state, action: PayloadAction<IRSupplierResponse>) => {
      state.characteristicReports.records = action.payload.records;
      state.characteristicReports.filesData = action.payload.rows;
    },
    setCharacteristicReportsPage: (state, action) => {
      state.characteristicReports.page = action.payload;
    },

    //goodsList
    setGoodsList: (state, action: PayloadAction<IGoodsListDataActionState>) => {
      const { rows, records } = action.payload;
      state.goodsList.data = rows;
      state.goodsList.records = records;
    },
    setGoodsListPagination: (state, action: PayloadAction<IGoodsListPageActionState>) => {
      const { page, rows } = action.payload;
      state.goodsList.page = page;
      state.goodsList.rows = rows;
    },
    setGoodsListSort: (state, action: PayloadAction<IGoodsListSorterActionState>) => {
      const { sortStatus, sidx } = action.payload;
      state.goodsList.sortValue = sortStatus;
      state.goodsList.sort = sidx;
    },
    setGoodsListFilters: (state, action: PayloadAction<Partial<ICatalogFilters>>) => {
      state.goodsList.filters = { ...state.goodsList.filters, ...action.payload };
    },
    resetGoodsListFilters: (state) => {
      state.goodsList.filters = initialState.goodsList.filters;
    },
    resetGoodsListFilter: (state, action: PayloadAction<IResetGoodsListFilterAction>) => {
      const { key, value } = action.payload;
      const currentFilters = state.goodsList.filters[key];

      if (!Array.isArray(currentFilters)) {
        state.goodsList.filters = { ...state.goodsList.filters, [key]: initialState.goodsList.filters[key] };
      } else {
        const updatedFilters = currentFilters.filter((code) => code !== value);
        state.goodsList.filters = { ...state.goodsList.filters, [key]: updatedFilters };
      }
    },
    setCatalogConfigChars: (state, action: PayloadAction<ICatalogState['configChars']>) => {
      state.configChars = action.payload;
    },
    resetCatalogConfigChars: (state) => {
      state.configChars = initialState.configChars;
    },
    setGoodsListStatus: (state, action: PayloadAction<NoIndexChecksType>) => {
      state.goodsList.listStatus = action.payload;
    },
    resetGoodsList: (state) => {
      const { listStatus: currentListStatus, page: pageGoogslist, rows: rowsGoodsList } = state.goodsList;
      state.goodsList = {
        ...initialState.goodsList,
        listStatus: currentListStatus,
        page: pageGoogslist,
        rows: rowsGoodsList,
      };
    },

    // unpublished files
    setUnpublishedFiles: (state, action: PayloadAction<IUnpublishedFilesDataActionState>) => {
      state.goodsList.unpublishedFiles.unpublishedGoods = action.payload.rows;
      state.goodsList.unpublishedFiles.records = action.payload.records;
    },
    setUnpublishedFilesPage: (state, action) => {
      state.goodsList.unpublishedFiles.page = action.payload;
    },
  },
});

export const {
  actions: {
    setGoodsList,
    setGoodsListPagination,
    setReportsPagination,
    setMissingData,
    setReportsData,
    setReporsSort,
    resetReportsData,
    setCharacteristicReportsPage,
    setCharacteristicReports,
    setCatalogMissingPage,
    setReportsUpdate,
    setReportsFilters,
    resetReportsFilter,
    resetReportsFilters,
    setGoodsListSort,
    setGoodsListFilters,
    resetGoodsListFilters,
    resetGoodsListFilter,
    setCatalogConfigChars,
    resetCatalogConfigChars,
    setGoodsListStatus,
    resetGoodsList,
    setUnpublishedFiles,
    setUnpublishedFilesPage,
  },
  reducer: catalogStateReducer,
} = catalogSlice;
