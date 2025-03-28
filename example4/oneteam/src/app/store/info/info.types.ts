export const InfoParamsOper = {
  invoiceStatus: 'invoice_status',
} as const;

export const InfoParamsGroup = {
  orders: 'm1',
  servicesActs: 'm2',
  noGroup: 'noGroup',
} as const;

export const InfoParamsType = {
  merchant: 'merchant',
  noType: 'noType',
} as const;

export const TypeInfoSearch = {
  class: 'class',
  clients: 'clients',
  co_table: 'co_table',
  main37: 'main37',
  help: 'help',
} as const;

export const TypeInfoSesSearch = {
  rManuf: 'r-manuf',
} as const;

export const CodeInfoSearch = {
  pme_state: 'pme_state',
  code51: '51',
  dict: 'dict',
  zero: 'zero',
  help_oneteam_type: 'help_oneteam_type',
  job_state: 'job_state',
  obj12: 'obj12',
  merch_reject: 'merch_reject',
  managment: 'form_gov',
  right_to_sign: 'right_to_sign',
  type_merchant: 'type_merchant',
  goods_transition_way: 'goods_transition_way',
  edi_transition_way: 'edi_transition_way',
} as const;
export const TermInfoSearch = {
  bt99: 'bt99',
  bt98: 'bt98',
  noTerm: 'noTerm',
} as const;

export const CodeInfoClass = {
  code81: '81',
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
  [TermInfoSearch.noTerm]: IInfoSearchState[];
}

export interface ITermDependantBaseCode51 extends ITermDependantBase {
  [TermInfoSearch.bt98]: IInfoSearchState[];
  [TermInfoSearch.bt99]: IInfoSearchState[];
}

export interface IAddressListElement {
  clicode: 2 | 5 | 8 | 11 | 15;
  code: string;
  id: string;
  value: string;
}

interface IInfoSearchCodeElementClass extends Record<string, ITermDependantBaseCode51> {
  [CodeInfoSearch.code51]: ITermDependantBaseCode51;
}

interface IInfoSearchCodeElementClient extends Record<string, ITermDependantBase> {
  [CodeInfoSearch.dict]: ITermDependantBase;
}

interface IInfoSearchCodeElementCoTable extends Record<string, ITermDependantBase> {
  [CodeInfoSearch.pme_state]: ITermDependantBase;
}

interface IInfoSearchCodeElementMain extends Record<string, ITermDependantBase> {
  [CodeInfoSearch.zero]: ITermDependantBase;
}

interface IInfoSearchCodeElementHelp extends Record<string, ITermDependantBase> {
  [CodeInfoSearch.obj12]: ITermDependantBase;
}

interface IInfoSearchTypeElement {
  [TypeInfoSearch.clients]: IInfoSearchCodeElementClient;
  [TypeInfoSearch.class]: IInfoSearchCodeElementClass;
  [TypeInfoSearch.co_table]: IInfoSearchCodeElementCoTable;
  [TypeInfoSearch.main37]: IInfoSearchCodeElementMain;
  [TypeInfoSearch.help]: IInfoSearchCodeElementHelp;
}

interface IInfoSesSearch {
  [TypeInfoSesSearch.rManuf]: IInfoSesSearchState[];
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
  [InfoParamsOper.invoiceStatus]: {
    [InfoParamsType.merchant]: Partial<
      Record<(typeof InfoParamsGroup)[keyof typeof InfoParamsGroup], ITreeInfoParams[]>
    >;
    [InfoParamsType.noType]: Partial<Record<(typeof InfoParamsGroup)[keyof typeof InfoParamsGroup], ITreeInfoParams[]>>;
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
