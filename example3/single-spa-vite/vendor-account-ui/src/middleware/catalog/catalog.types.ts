import { GoodsListSidxType, ICatalogFilters, NoIndexChecksType } from '@app/store/catalog/catalog.types';
import { IResponse } from '@middleware/root.types';
import { SortOrderType } from '@store/root.types';

import { IReportsFilesData } from '../reports/reports.types';

export const ObfCategories = {
  GOODS_LIST: 'goodsList',
  UNPUB_REPORTS: 'unpubreports',
  RX_REPORTS: 'rxreports',
} as const;

export interface IPostReportsActionState {
  name: string;
  dir: string;
}

export interface IGoodsListActionState extends ICatalogFilters {
  page: number;
  rows: number;
  sort: GoodsListSidxType;
  sortValue: SortOrderType;
  listStatus: NoIndexChecksType;
}

export interface IPostReportsSagaState {
  payload: IPostReportsActionState;
  type: string;
}

export interface IGetCatalogSagaState {
  payload: IGoodsListActionState;
  type: string;
}

export interface IGoodsListItem {
  EAES: boolean;
  actions: unknown[];
  add_info_card: unknown;
  analog: string;
  analog_faster: boolean;
  art: string;
  basket_cnt: string;
  bbul: string;
  calc_analog: boolean;
  can_basket: string;
  cnt_similar: number;
  code: string;
  conf_mnf_type: string;
  conf_mnf_url: string;
  config: string;
  constr: boolean;
  country: string;
  crs_days: number;
  edizm: string;
  expert_replacement: boolean;
  gdsAvailKDK: string;
  gdsAvailLC: string;
  gdsAvailOP: string;
  gdsCommonAvail: string;
  gdsExtArt: string;
  gdsImages: Array<{
    gdsImgRef: string;
    gdsImgSrc: string;
  }>;
  gdsPickup: string;
  gdsSubBrand: string;
  gdsTechDescExt: unknown[];
  gdsTechDescInt: unknown[];
  gdscode: string | number;
  group: string;
  id: string;
  image: string;
  info: string;
  isIndex: boolean;
  kpp: boolean;
  labelConfig: string;
  main_card: string;
  min_cnt: string;
  mnf_action: string;
  mnf_code: number;
  mnf_link: string;
  mnf_name: string;
  mnf_ser: string;
  more: string;
  my: string;
  myCatalog: number;
  my_code: string;
  my_code_edit: boolean;
  name: string;
  new: boolean;
  nlk: string;
  nlk_status: string;
  nlk_title: string;
  not_produced: boolean;
  notify_availability: boolean;
  op_lc_days: number;
  pack: string;
  pack_alt: string;
  pack_color: string;
  price: string;
  price98: string;
  price482: string;
  price_color: string;
  price_dec: number;
  price_title: string;
  q_same_card: number;
  qual: string;
  qual82_img: string;
  qual82_title: string;
  rag_code: string;
  rag_name: string;
  rem: string;
  rem_add: string;
  rem_crs: number;
  rem_expected: number;
  rem_op: string;
  rse_code: string;
  rse_name: string;
  solution: string;
  solution_image: string;
  solution_name: string;
  solution_title: string;
  subcard: boolean;
  taking: string;
  type: string;
  typeProperties: {
    Button_name: string;
  };
}

export type IRSupplierResponse = Omit<IResponseGetCharacteristicsFilesData, 'total' | 'userdata'>;

export interface IResponseGetFile extends IResponse {
  data: {
    rows: IReportsFilesData[];
    records: number;
  };
}

export interface ICharacteristicsFileInfo {
  date: string;
  file: {
    name: string;
    url: string;
  };
}

export interface IGoodsFilesDataItem {
  id: string;
  obf_category: string;
  obf_comment: string;
  obf_credate: string;
  obf_dir: string;
  obf_file: string;
  obf_id: string;
  obf_name: string;
  obf_type: string;
  obj_id: string;
  url: string;
}

export interface IUnpublishGoodsFilesDataItem {
  obfId: string;
  name: string;
  fileName: string;
  date: string;
  fileUrl: string;
}

export interface IResponseGetCharacteristicsFilesData {
  rows: ICharacteristicsFileInfo[];
  page: number;
  records: number;
  total: number;
  userdata: {
    error: string;
    limit: string;
  };
}

export interface IGoodsFilesData {
  rows: IGoodsFilesDataItem[];
  page: number;
  records: number;
  total: number;
  userdata: {
    error: string;
    limit: string;
  };
}

export interface IAdaptedGoodsFilesData extends Omit<IGoodsFilesData, 'rows'> {
  rows: IUnpublishGoodsFilesDataItem[];
}

export interface IResponseGetGoodsList extends IResponse {
  data: {
    limit: boolean;
    memkey: string;
    records: number;
    result_desc: string;
    result_improve: string;
    result_key: string;
    result_text: string;
    result_tooltip: string;
    rows: IGoodsListItem[];
    str: string;
    str_fnd: string;
    str_sys: string;
    timeX: number;
    timeY: number;
    total: number;
  };
}

export const NoIndexValues = {
  UNPUBLISHED: 'unpublished',
  ALL: 'all',
} as const;

export const CategoryCharCode = {
  989: 989,
  82: 82,
} as const;

export interface IGetConfigCharsPayload {
  classCode: string;
  manufacturerCode: string;
  val?: string;
  pars?: (keyof typeof CategoryCharCode)[];
}

export interface IGetConfigCharsAction {
  type: string;
  payload: IGetConfigCharsPayload;
}

interface IConfigCharContent {
  ConfigCharIdVal: string;
  ConfigCharVal: string;
}

export interface IConfigChars {
  ConfigCharCode: keyof typeof CategoryCharCode;
  ConfigCharName: string;
  ConfigCharContent: Array<IConfigCharContent>;
}

export interface ICatalogConfigCharsResponse extends IResponse {
  data: {
    ConfigChars: Array<IConfigChars>;
  };
}

export interface IGetGoodsFilesActionPayload {
  page: number;
  rows: number;
}
export interface IGetGoodsFilesAction {
  type: string;
  payload: IGetGoodsFilesActionPayload;
}

export interface IGetGoodsFilesResponse extends IResponse {
  data: IGoodsFilesData;
}
