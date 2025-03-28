import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITemplateState } from './template.types';

const templateSliceName = 'template';

const initialState: ITemplateState = {
  rejectedFiles: {},
  total: 0,
};

const templateSlice = createSlice({
  name: templateSliceName,
  initialState,
  reducers: {
    setRejectedFiles: (state, action: PayloadAction<ITemplateState>) => {
      const { rejectedFiles, total } = action.payload;
      state.rejectedFiles = rejectedFiles;
      state.total = total;
    },
    resetTemplate: () => initialState,
  },
});

export const {
  actions: { setRejectedFiles, resetTemplate },
  reducer: templateStateReducer,
} = templateSlice;
