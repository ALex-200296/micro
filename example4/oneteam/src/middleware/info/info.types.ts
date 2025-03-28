import {
  CodeInfoClass,
  CodeInfoSearch,
  IAddressListElement,
  IInfoClassState,
  IInfoClientListElem,
  IInfoSearchState,
  InfoParamsGroup,
  InfoParamsOper,
  InfoParamsType,
  ITreeInfoParams,
  TermInfoSearch,
  TypeInfoSearch,
  TypeInfoSesSearch,
} from '@app/store/info/info.types';
import { IResponse } from '@middleware/root.types';

export interface ICladrSagaPayload {
  code?: string;
  term?: string;
  matches?: boolean;
  clicode?: 2 | 5 | 8 | 11 | 15;
}

export interface ICladrSagaState {
  payload: ICladrSagaPayload;
  type: string;
}

export interface IResponseGetCladr extends IResponse {
  data: IAddressListElement[];
}

export interface IInfoSearchSagaPayload {
  type: (typeof TypeInfoSearch)[keyof typeof TypeInfoSearch];
  code: (typeof CodeInfoSearch)[keyof typeof CodeInfoSearch];
  len?: number;
  lenLim?: number;
  term?: (typeof TermInfoSearch)[keyof typeof TermInfoSearch];
  cyrillicComplexTerm?: string;
  cli?: string;
  message?: string;
}

export interface IInfoSesSearchSagaPayload {
  type: (typeof TypeInfoSesSearch)[keyof typeof TypeInfoSesSearch];
}

export interface IGetInfoSearchSagaState {
  type: string;
  payload: IInfoSearchSagaPayload;
}

export interface IGetInfoSesSearchSagaState {
  type: string;
  payload: IInfoSesSearchSagaPayload;
}

export interface IResponseGetInfoSearch extends IResponse {
  data: {
    rows: IInfoSearchState[];
    records: number;
  };
}

export interface IInfoParamsRows {
  id: string;
  name: string;
  parent?: string;
}

export interface IInfoSesSearchRows {
  id: string;
  value: string;
  label: string;
}

export interface IInfoParamsActionState {
  oper: (typeof InfoParamsOper)[keyof typeof InfoParamsOper];
  type?: (typeof InfoParamsType)[keyof typeof InfoParamsType];
  group?: (typeof InfoParamsGroup)[keyof typeof InfoParamsGroup];
  actions?: { payload: (rows: ITreeInfoParams[]) => any; type: string }[];
}

export interface IGetInfoParamsSagaState {
  type: string;
  payload: IInfoParamsActionState;
}

export interface IResponseGetInfoParams extends IResponse {
  data: {
    rows: IInfoParamsRows[];
  };
}

export interface IResponseGetInfoSesSearch extends IResponse {
  data: {
    rows: IInfoSesSearchRows[];
  };
}

export interface IInfoClassActionState {
  code: (typeof CodeInfoClass)[keyof typeof CodeInfoClass];
  city?: number;
  id?: string;
}

export interface IGetInfoClassSagaState {
  type: string;
  payload: IInfoClassActionState;
}

export interface IResponseGetInfoClass extends IResponse {
  data: {
    rows: IInfoClassState[];
  };
}

export interface IInfoClientActionState {
  searchValue?: string;
  clientCode?: string;
  clientName?: string;
  managerCode?: string;
  inn?: string;
  kpp?: string;
}
export interface IGetInfoClientSagaState {
  type: string;
  payload: IInfoClientActionState;
}

interface IInfoClientsSubs {
  'cli-code': string;
  'cli-name': string;
  inn: string;
  isActive: boolean;
  'supp-cust': string;
}

export interface IInfoClientsRows {
  'cli-code': string;
  'cli-name': string;
  'long-name1': string;
  svyaz: IInfoClientsSubs[];
}

export interface IResponseGetInfoClient extends IResponse {
  data: {
    rows: IInfoClientsRows[];
  };
}
