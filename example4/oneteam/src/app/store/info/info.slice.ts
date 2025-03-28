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
    [InfoParamsOper.invoiceStatus]: {
      [InfoParamsType.merchant]: {
        [InfoParamsGroup.orders]: [],
        [InfoParamsGroup.noGroup]: [],
      },
      [InfoParamsType.noType]: {
        [InfoParamsGroup.orders]: [],
        [InfoParamsGroup.servicesActs]: [],
        [InfoParamsGroup.noGroup]: [],
      },
    },
  },
  infoSearch: {
    [TypeInfoSearch.class]: {
      [CodeInfoSearch.code51]: {
        [TermInfoSearch.noTerm]: [],
        [TermInfoSearch.bt99]: [],
        [TermInfoSearch.bt98]: [],
      },
    },
    [TypeInfoSearch.clients]: {
      [CodeInfoSearch.dict]: {
        [TermInfoSearch.noTerm]: [],
      },
    },
    [TypeInfoSearch.co_table]: {
      [CodeInfoSearch.pme_state]: {
        [TermInfoSearch.noTerm]: [],
      },
      [CodeInfoSearch.type_merchant]: {
        [TermInfoSearch.noTerm]: [],
      },
      [CodeInfoSearch.help_oneteam_type]: {
        [TermInfoSearch.noTerm]: [],
      },
      [CodeInfoSearch.job_state]: {
        [TermInfoSearch.noTerm]: [],
      },
      [CodeInfoSearch.merch_reject]: {
        [TermInfoSearch.noTerm]: [],
      },
      [CodeInfoSearch.managment]: {
        noTerm: [],
      },
      [CodeInfoSearch.right_to_sign]: {
        noTerm: [],
      },
      [CodeInfoSearch.goods_transition_way]: {
        noTerm: [],
      },
      [CodeInfoSearch.edi_transition_way]: {
        noTerm: [],
      },
    },
    [TypeInfoSearch.main37]: {
      [CodeInfoSearch.zero]: {
        [TermInfoSearch.noTerm]: [],
      },
    },
    [TypeInfoSearch.help]: {
      [CodeInfoSearch.obj12]: {
        [TermInfoSearch.noTerm]: [],
      },
    },
  },
  infoClass: {
    [CodeInfoClass.code81]: [],
  },
  infoClient: [],
  infoSesSearch: {
    [TypeInfoSesSearch.rManuf]: [],
  },
};

const infoSlice = createSlice({
  name: infoSliceName,
  initialState,
  reducers: {
    setInfoSearchData: (state, action: PayloadAction<ISetInfoSearchData>) => {
      const { type, code, data, term = TermInfoSearch.noTerm } = action.payload;
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
      const { oper, type = InfoParamsType.noType, group = InfoParamsGroup.noGroup, rows } = action.payload;
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
