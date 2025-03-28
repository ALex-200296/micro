import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  CodeInfoClass,
  CodeInfoSearch,
  IAddressListElement,
  IInfoClientListElem,
  IInfoParamsActionState,
  IInfoSesSearchActionState,
  IInfoState,
  InfoParamsGroup,
  InfoParamsOper,
  InfoParamsType,
  ISetInfoClassActionState,
  ISetInfoSearchData,
  TermInfoSearch,
  TypeInfoSearch,
  TypeInfoSesSearch,
} from './info.types';

export const infoSliceName = 'info';

const searchLevels: [2, 5, 8, 11, 15] = [2, 5, 8, 11, 15];

const initialState: IInfoState = {
  infoCladr: {
    addressList: [],
    addressHistory: [],
    cityCode: '',
    searchLevel: 2,
    searchValue: '',
  },
  infoParams: {
    [InfoParamsOper.INVOICE_STATUS]: {
      [InfoParamsType.MERCHANT]: {
        [InfoParamsGroup.ORDERS]: [],
        [InfoParamsGroup.NO_GROUP]: [],
      },
      [InfoParamsType.NO_TYPE]: {
        [InfoParamsGroup.ORDERS]: [],
        [InfoParamsGroup.SERVICES_ACTS]: [],
        [InfoParamsGroup.NO_GROUP]: [],
      },
    },
  },
  infoSearch: {
    [TypeInfoSearch.CLASS]: {
      [CodeInfoSearch.CODE_51]: {
        [TermInfoSearch.NO_TERM]: [],
        [TermInfoSearch.BT_99]: [],
        [TermInfoSearch.BT_98]: [],
      },
    },
    [TypeInfoSearch.CLIENTS]: {
      [CodeInfoSearch.DICT]: {
        [TermInfoSearch.NO_TERM]: [],
      },
    },
    [TypeInfoSearch.CO_TABLE]: {
      [CodeInfoSearch.PME_STATE]: {
        [TermInfoSearch.NO_TERM]: [],
      },
      [CodeInfoSearch.TYPE_MERCHANT]: {
        [TermInfoSearch.NO_TERM]: [],
      },
      [CodeInfoSearch.HELP_ONETEAM_TYPE]: {
        [TermInfoSearch.NO_TERM]: [],
      },
      [CodeInfoSearch.JOB_STATE]: {
        [TermInfoSearch.NO_TERM]: [],
      },
      [CodeInfoSearch.MERCH_REJECT]: {
        [TermInfoSearch.NO_TERM]: [],
      },
      [CodeInfoSearch.MANAGMENT]: {
        noTerm: [],
      },
      [CodeInfoSearch.RIGHT_TO_SING]: {
        noTerm: [],
      },
      [CodeInfoSearch.GOODS_TRANSITION_WAY]: {
        noTerm: [],
      },
      [CodeInfoSearch.EDI_TRANSITION_WAY]: {
        noTerm: [],
      },
    },
    [TypeInfoSearch.MAIN_37]: {
      [CodeInfoSearch.ZERO]: {
        [TermInfoSearch.NO_TERM]: [],
      },
    },
    [TypeInfoSearch.HELP]: {
      [CodeInfoSearch.OBJ_12]: {
        [TermInfoSearch.NO_TERM]: [],
      },
    },
  },
  infoClass: {
    [CodeInfoClass.CODE_81]: [],
  },
  infoClient: [],
  infoSesSearch: {
    [TypeInfoSesSearch.R_MANUF]: [],
  },
};

const infoSlice = createSlice({
  name: infoSliceName,
  initialState,
  reducers: {
    setInfoSearchData: (state, action: PayloadAction<ISetInfoSearchData>) => {
      const { type, code, data, term = TermInfoSearch.NO_TERM } = action.payload;
      state.infoSearch[type][code][term] = data;
    },
    setInfoSesSearchData: (state, action: PayloadAction<IInfoSesSearchActionState>) => {
      const { type, rows } = action.payload;
      state.infoSesSearch[type] = rows;
    },
    setInfoCladrAddressList: (state, action: PayloadAction<IAddressListElement[]>) => {
      state.infoCladr.addressList = action.payload;
    },
    setInfoParams: (state, action: PayloadAction<IInfoParamsActionState>) => {
      const { oper, type = InfoParamsType.NO_TYPE, group = InfoParamsGroup.NO_GROUP, rows } = action.payload;
      state.infoParams[oper][type][group] = rows;
    },
    pushInfoCladrAddressToHistory: (state, action: PayloadAction<IAddressListElement>) => {
      state.infoCladr.addressHistory.push(action.payload);
      state.infoCladr.cityCode = action.payload.code;
      state.infoCladr.searchValue = '';
      state.infoCladr.searchLevel =
        searchLevels[searchLevels.findIndex((elem) => elem === state.infoCladr.searchLevel) + 1] || 15;
    },
    popInfoCladrAddressFromHistory: (state) => {
      const removingEndOfSearch = state.infoCladr.addressHistory.length === 5;
      state.infoCladr.addressHistory.pop();
      state.infoCladr.cityCode = state.infoCladr.addressHistory[state.infoCladr.addressHistory.length - 1]?.code || '';
      state.infoCladr.searchValue = '';
      state.infoCladr.searchLevel = removingEndOfSearch
        ? 15
        : searchLevels[searchLevels.findIndex((elem) => elem === state.infoCladr.searchLevel) - 1] || 2;
    },
    setInfoCladrSearchValue: (state, action: PayloadAction<string>) => {
      state.infoCladr.searchValue = action.payload;
    },
    resetInfoCladr: (state) => {
      state.infoCladr = initialState.infoCladr;
    },
    setInfoClass: (state, action: PayloadAction<ISetInfoClassActionState>) => {
      const { code, data } = action.payload;
      state.infoClass[code] = data;
    },
    setInfoClient: (state, action: PayloadAction<IInfoClientListElem[]>) => {
      state.infoClient = action.payload;
    },
  },
});

export const {
  actions: {
    setInfoSearchData,
    setInfoSesSearchData,
    setInfoCladrSearchValue,
    setInfoCladrAddressList,
    popInfoCladrAddressFromHistory,
    pushInfoCladrAddressToHistory,
    resetInfoCladr,
    setInfoParams,
    setInfoClass,
    setInfoClient,
  },
  reducer: infoStateReducer,
} = infoSlice;
