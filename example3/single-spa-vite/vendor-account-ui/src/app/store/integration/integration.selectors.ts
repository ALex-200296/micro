import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/root.store';

import { IntegrationComputedPropertyKeyType } from './integration.types';

const selectIntegrationSlice = (state: RootState) => state.integration;

export const integrationSelectors = {
  getIntegrationTableData: (property: IntegrationComputedPropertyKeyType) =>
    createSelector(selectIntegrationSlice, (integrationState) => integrationState[property].loadedData.data),
  getIntegrationFiltersCount: (property: IntegrationComputedPropertyKeyType) =>
    createSelector(selectIntegrationSlice, (integrationState) =>
      Object.values(integrationState[property].filters).reduce((accum, current) => (current ? accum + 1 : accum), 0),
    ),
  getIntegrationActionsData: (property: IntegrationComputedPropertyKeyType) =>
    createSelector(selectIntegrationSlice, (integrationState) => ({
      ...integrationState[property],
      records: integrationState[property].loadedData.records,
    })),
};
