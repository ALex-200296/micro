import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAnalyticsState, ISetAnalyticsPagination, ISetReportsActionState } from './analytics.types';

export const analyticsSliceName = 'analytics';

const initialState: IAnalyticsState = {
  reportsData: {
    data: [],
    records: 0,
    total: 0,
    page: 1,
    rows: 10,
  },
};

const analyticsSlice = createSlice({
  name: analyticsSliceName,
  initialState,
  reducers: {
    setReportsData: (state, action: PayloadAction<ISetReportsActionState>) => {
      state.reportsData.data = action.payload.data;
      state.reportsData.records = action.payload.records;
      state.reportsData.total = action.payload.total;
    },
    setReportsPagination: (state, action: PayloadAction<ISetAnalyticsPagination>) => {
      const { page, rows } = action.payload;
      state.reportsData.page = page;
      state.reportsData.rows = rows;
    },
  },
});

export const {
  actions: { setReportsData, setReportsPagination },
  reducer: analyticsStateReducer,
} = analyticsSlice;
