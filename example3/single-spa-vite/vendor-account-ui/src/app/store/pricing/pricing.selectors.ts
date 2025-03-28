import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/root.store';

import { PricingComputedPropertyState } from './pricing.types';

const pricingSlice = (state: RootState) => state.pricing;

export const pricingSelectors = {
  getPricingFiltersCount: (property: keyof typeof PricingComputedPropertyState) =>
    createSelector(pricingSlice, (pricingState) =>
      Object.values(pricingState[property].filters).reduce((accum, current) => (current ? accum + 1 : accum), 0),
    ),
  getPricingTableData: (property: keyof typeof PricingComputedPropertyState) =>
    createSelector(pricingSlice, (pricingState) => pricingState[property].loadedData.data),
  getPricingActionsData: (property: keyof typeof PricingComputedPropertyState) =>
    createSelector(pricingSlice, (pricingState) => ({
      ...pricingState[property],
      records: pricingState[property].loadedData.records,
    })),
};
