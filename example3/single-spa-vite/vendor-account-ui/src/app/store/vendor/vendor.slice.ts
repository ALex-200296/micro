import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const vendorSliceName = 'vendor';

type VendorInitialState = {
  usedFields: string | null;
};

export const initialState: VendorInitialState = {
  usedFields: null,
};

const vendorSlice = createSlice({
  name: vendorSliceName,
  initialState,
  reducers: {
    setUsedFields: (state, action: PayloadAction<string | null>) => {
      state.usedFields = action.payload;
    },
  },
});

export const {
  actions: { setUsedFields },
  reducer: vendorStateReducer,
} = vendorSlice;
