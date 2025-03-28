import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/root.store';

const selectFactoringSlice = (state: RootState) => state.factoring;

export const factoringSelectors = {
  getFactoringUuidData: createSelector(selectFactoringSlice, (factoringState) => factoringState.uuid),
};
