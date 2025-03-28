import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IContractsInfo, IUserInitialState, IUserSetState, IVendorClientInfo, UserRightsStateType } from './user.types';

export const userSliceName = 'user';

export const initialState: IUserInitialState = {
  isAuth: false,
  error: false,
  user: {
    city: '',
    login_type: '',
    login: '',
    org_id: '',
    clicode: '',
    manufs: [],
  },
  userProfile: {
    fio: '',
    firstname: '',
    lastname: '',
    parentname: '',
    exw_positionName: '',
    cliName: '',
    phone: '',
    email: '',
    ofic: '',
    mancode: '',
    manager: '',
    ArrManagerKuCp: [],
    ArrEmployeeIvp: [],
    ArrManagerKuRc: [],
    users_lkp: [],
    firms: [],
  },
  contractsInfo: {
    OrgCode: '',
    OrgName: '',
    OrgInn: '',
    OrgKpp: '',
    OrgCkg: '',
    OrgCkgCode: '',
    ContractsVendors: [],
  },
  clients: [],
};

const userSlice = createSlice({
  name: userSliceName,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserSetState>) => ({ ...state, ...action.payload }),
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setRights: (state, action: PayloadAction<null | UserRightsStateType>) => {
      state.user.rights = action.payload;
    },
    setContracts: (state, action: PayloadAction<IContractsInfo>) => {
      state.contractsInfo = action.payload;
    },
    setVendorClients: (state, action: PayloadAction<IVendorClientInfo[]>) => {
      state.clients = action.payload;
    },
  },
});

export const {
  actions: { setUser, setError, setContracts, setRights, setVendorClients },
  reducer: userStateReducer,
} = userSlice;
