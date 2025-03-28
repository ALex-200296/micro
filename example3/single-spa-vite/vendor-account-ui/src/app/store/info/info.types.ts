export const InfoParamsOper = {
  INVOICE_STATUS: 'invoice_status',
} as const;

export const InfoParamsGroup = {
  ORDERS: 'm1',
  SERVICES_ACTS: 'm2',
  NO_GROUP: 'noGroup',
} as const;

export const InfoParamsType = {
  MERCHANT: 'merchant',
  NO_TYPE: 'noType',
} as const;

export const TypeInfoSearch = {
  CLASS: 'class',
  CLIENTS: 'clients',
  CO_TABLE: 'co_table',
  MAIN_37: 'main37',
  HELP: 'help',
} as const;

export const TypeInfoSesSearch = {
  R_MANUF: 'r-manuf',
} as const;

export const CodeInfoSearch = {
  PME_STATE: 'pme_state',
  CODE_51: '51',
  DICT: 'dict',
  ZERO: 'zero',
  HELP_ONETEAM_TYPE: 'help_oneteam_type',
  JOB_STATE: 'job_state',
  OBJ_12: 'obj12',
  MERCH_REJECT: 'merch_reject',
  MANAGMENT: 'form_gov',
  RIGHT_TO_SING: 'right_to_sign',
  TYPE_MERCHANT: 'type_merchant',
  GOODS_TRANSITION_WAY: 'goods_transition_way',
  EDI_TRANSITION_WAY: 'edi_transition_way',
} as const;

export const TermInfoSearch = {
  BT_99: 'bt99',
  BT_98: 'bt98',
  NO_TERM: 'noTerm',
} as const;

export const CodeInfoClass = {
  CODE_81: '81',
} as const;

export interface IInfoSearchState {
  id: string;
  code: string;
  label?: string;
  value?: string;
  long_name?: string;
  name?: string;
  inn?: string;
  class37?: string;
  extra?: string;
}

export interface IInfoSesSearchState {
  id: string;
  value: string;
  label: string;
}

export interface IInfoClassState {
  id: string;
  title: string;
  konf: string;
  isFolder: string;
  url: string;
  img: string;
  addClass: Array<unknown>;
}

export interface ITermDependantBase extends Record<string, IInfoSearchState[]> {
  [TermInfoSearch.NO_TERM]: IInfoSearchState[];
}

export interface ITermDependantBaseCode51 extends ITermDependantBase {
  [TermInfoSearch.BT_98]: IInfoSearchState[];
  [TermInfoSearch.BT_99]: IInfoSearchState[];
}

export interface IAddressListElement {
  clicode: 2 | 5 | 8 | 11 | 15;
  code: string;
  id: string;
  value: string;
}

interface IInfoSearchCodeElementClass extends Record<string, ITermDependantBaseCode51> {
  [CodeInfoSearch.CODE_51]: ITermDependantBaseCode51;
}

interface IInfoSearchCodeElementClient extends Record<string, ITermDependantBase> {
  [CodeInfoSearch.DICT]: ITermDependantBase;
}

interface IInfoSearchCodeElementCoTable extends Record<string, ITermDependantBase> {
  [CodeInfoSearch.PME_STATE]: ITermDependantBase;
}

interface IInfoSearchCodeElementMain extends Record<string, ITermDependantBase> {
  [CodeInfoSearch.ZERO]: ITermDependantBase;
}

interface IInfoSearchCodeElementHelp extends Record<string, ITermDependantBase> {
  [CodeInfoSearch.OBJ_12]: ITermDependantBase;
}

interface IInfoSearchTypeElement {
  [TypeInfoSearch.CLIENTS]: IInfoSearchCodeElementClient;
  [TypeInfoSearch.CLASS]: IInfoSearchCodeElementClass;
  [TypeInfoSearch.CO_TABLE]: IInfoSearchCodeElementCoTable;
  [TypeInfoSearch.MAIN_37]: IInfoSearchCodeElementMain;
  [TypeInfoSearch.HELP]: IInfoSearchCodeElementHelp;
}

interface IInfoSesSearch {
  [TypeInfoSesSearch.R_MANUF]: IInfoSesSearchState[];
}

export interface IInfoParam {
  id: string;
  name: string;
  parent?: string;
}

export interface ITreeInfoParams extends IInfoParam {
  children?: IInfoParam[];
}

export interface IInfoParams {
  [InfoParamsOper.INVOICE_STATUS]: {
    [InfoParamsType.MERCHANT]: Partial<
      Record<(typeof InfoParamsGroup)[keyof typeof InfoParamsGroup], ITreeInfoParams[]>
    >;
    [InfoParamsType.NO_TYPE]: Partial<Record<(typeof InfoParamsGroup)[keyof typeof InfoParamsGroup], ITreeInfoParams[]>>;
  };
}

export interface IInfoParamsActionState {
  oper: (typeof InfoParamsOper)[keyof typeof InfoParamsOper];
  type?: (typeof InfoParamsType)[keyof typeof InfoParamsType];
  group?: (typeof InfoParamsGroup)[keyof typeof InfoParamsGroup];
  rows: ITreeInfoParams[];
}

export interface IInfoSesSearchActionState {
  type: (typeof TypeInfoSesSearch)[keyof typeof TypeInfoSesSearch];
  rows: IInfoSesSearchState[];
}

interface IInfoClientSubListElem {
  clientCode: string;
  clientName: string;
  inn: string;
  isActive: boolean;
  suppCustomer: string;
}

export interface IInfoClientListElem {
  clientCode: string;
  clientName: string;
  longName: string;
  subs: IInfoClientSubListElem[];
}

export interface IInfoState {
  infoCladr: {
    addressHistory: IAddressListElement[];
    addressList: IAddressListElement[];
    cityCode: string;
    searchLevel: 2 | 5 | 8 | 11 | 15;
    searchValue: string;
  };
  infoSearch: IInfoSearchTypeElement;
  infoParams: IInfoParams;
  infoClass: Record<(typeof CodeInfoClass)[keyof typeof CodeInfoClass], IInfoClassState[]>;
  infoClient: IInfoClientListElem[];
  infoSesSearch: IInfoSesSearch;
}

export interface ISetInfoSearchData {
  type: (typeof TypeInfoSearch)[keyof typeof TypeInfoSearch];
  code: (typeof CodeInfoSearch)[keyof typeof CodeInfoSearch];
  term?: (typeof TermInfoSearch)[keyof typeof TermInfoSearch];
  data: IInfoSearchState[];
}

export interface ISetInfoClassActionState {
  code: (typeof CodeInfoClass)[keyof typeof CodeInfoClass];
  data: IInfoClassState[];
}
