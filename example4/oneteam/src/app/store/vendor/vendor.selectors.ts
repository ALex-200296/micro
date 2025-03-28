import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/root.store';

const selectVendorUsedFields = (state: RootState) => state.vendor.usedFields;

export const vendorSelectors = {
  getVendorUsedFields: createSelector(selectVendorUsedFields, (userState) => userState),
};
