import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/root.store';

import { CatalogComputedPropertyState } from './catalog.types';

const selectCatalogSlice = (state: RootState) => state.catalog;

const selectCharacteristicsReports = (state: RootState) => state.catalog.characteristicReports;
const selectGoodsList = (state: RootState) => state.catalog.goodsList;
const selectUnpublishedGoodsList = (state: RootState) => state.catalog.goodsList.unpublishedFiles;

export const catalogSelectors = {
  getMissingData: (property: keyof typeof CatalogComputedPropertyState) =>
    createSelector(selectCatalogSlice, (catalogStore) => catalogStore[property].missingData),
  getCatalogFiltersCount: (property: keyof typeof CatalogComputedPropertyState) =>
    createSelector(selectCatalogSlice, (catalogStore) =>
      Object.values(catalogStore[property].filters).reduce((accum, current) => (current ? accum + 1 : accum), 0),
    ),
  getCatalogTableData: (property: keyof typeof CatalogComputedPropertyState) =>
    createSelector(selectCatalogSlice, (catalogStore) => catalogStore[property].loadedData.data),
  getCatalogActionsData: (property: keyof typeof CatalogComputedPropertyState) =>
    createSelector(selectCatalogSlice, (catalogStore) => ({
      ...catalogStore[property],
      records: catalogStore[property].loadedData.records,
    })),
  getReportsTableData: createSelector(
    selectCharacteristicsReports,
    (catalogFilesDataState) => catalogFilesDataState.filesData,
  ),
  getCharacteristicReportsState: createSelector(selectCharacteristicsReports, (items) => ({
    rows: items.rows,
    page: items.page,
    records: items.records,
  })),
  getGoodsList: createSelector(selectGoodsList, (items) => items.data),
  getGoodsListPagination: createSelector(selectGoodsList, (items) => ({
    rows: items.rows,
    page: items.page,
    records: items.records,
  })),
  getGoodsListSorter: createSelector(selectGoodsList, (items) => ({
    sort: items.sort,
    sortValue: items.sortValue,
  })),
  getGoodsListFilters: createSelector(selectGoodsList, (item) => item.filters),
  getGoodsListFiltersCount: createSelector(
    selectGoodsList,
    (goodList) =>
      Object.values(goodList.filters).filter((value) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return Boolean(value && value !== '');
      }).length,
  ),
  getConfigChars: createSelector(selectCatalogSlice, (items) => items.configChars),
  getGoodsListStatus: createSelector(selectGoodsList, (items) => items.listStatus),
  getUnpublishedGoodsData: createSelector(selectUnpublishedGoodsList, (items) => items.unpublishedGoods),
  getUnpublishedGoodsState: createSelector(selectUnpublishedGoodsList, (items) => ({
    rows: items.rows,
    page: items.page,
    records: items.records,
  })),
};
