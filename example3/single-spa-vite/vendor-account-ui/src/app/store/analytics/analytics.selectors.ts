import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/root.store';

const selectUserSlice = (state: RootState) => state.analytics;

export const analyticsSelectors = {
  getAnalyticsData: createSelector(selectUserSlice, (analyticsState) => analyticsState.reportsData),
  getAnalyticsTableData: createSelector(selectUserSlice, (analyticsState) => analyticsState.reportsData.data),
};
