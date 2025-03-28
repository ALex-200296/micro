import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/root.store';

import { LogisticsComputedPropertyState } from './logistics.types';

const selectLogisticsSlice = (state: RootState) => state.logistics;

export const logisticsSelectors = {
  getLogisticsAdditionalData: (property: keyof typeof LogisticsComputedPropertyState) =>
    createSelector(selectLogisticsSlice, (logisticsState) => ({
      ...logisticsState[property],
      records: logisticsState[property].loadedData.records,
    })),
  getLogisticsTableData: (property: keyof typeof LogisticsComputedPropertyState) =>
    createSelector(selectLogisticsSlice, (logisticsState) => logisticsState[property].loadedData.data),
  getLogisticsFiltersCount: (property: keyof typeof LogisticsComputedPropertyState) =>
    createSelector(selectLogisticsSlice, (logisticsState) =>
      Object.values(logisticsState[property].filters).reduce((accum, current) => (current ? accum + 1 : accum), 0),
    ),
};
