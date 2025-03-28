import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFactoringInitialState, ISetUuidData } from './factoring.types';

export const factoringSliceName = 'factoring';

const initialState: IFactoringInitialState = {
  uuid: {
    orgName: '',
    orgInn: '',
    orgKpp: '',
    loginFio: '',
    completed: false,
  },
};

const factoringSlice = createSlice({
  name: factoringSliceName,
  initialState,
  reducers: {
    setUuidData: (state, action: PayloadAction<ISetUuidData>) => {
      const { data } = action.payload;
      state.uuid = data;
    },
  },
});

export const {
  actions: { setUuidData },
  reducer: factoringStateReducer,
} = factoringSlice;
