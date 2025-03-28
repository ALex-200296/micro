import { CategoryCharCode, IGoodsListItem, IUnpublishGoodsFilesDataItem } from '@middleware/catalog/catalog.types';
import { IReportsFiles, IReportsFilesData } from '@middleware/reports/reports.types';
import { IDefaultReportsState, ReportsFilterType, SortOrderType } from '@store/root.types';

export const CatalogComputedPropertyState = {
  GOODS_LOAD: 'goodsLoad',
  NEW_GOODS_LOAD: 'newGoodsLoad',
  CERTIFICATES_LOAD: 'certificatesLoad',
  IMAGES_LOAD: 'imagesLoad',
  DESCRIPTION_LOAD: 'descriptionLoad',
  TECH_INFO_LOAD: 'techInfoLoad',
  PRICE_LOAD: 'priceLoad',
  ANALOG_LOAD: 'analogLoad',
  CONSTRUCTOR_LOAD: 'constructorLoad',
  SAME_TYPE_LOAD: 'sametypeLoad',
} as const;

export type CatalogComputedPropertyStateType =
  (typeof CatalogComputedPropertyState)[keyof typeof CatalogComputedPropertyState];
export interface ICharacteristicsReportsData {
  date: string;
  file: {
    name: string;
    url: string;
  };
}

type IAdaptedCatalogTableItems = {
  mnfSer: IGoodsListItem['mnf_ser'];
  gdsCode: IGoodsListItem['gdscode'];
};

export type ICatalogTableItems = IAdaptedCatalogTableItems &
  Pick<IGoodsListItem, 'id' | 'image' | 'name' | 'gdsExtArt' | 'gdsSubBrand' | 'edizm' | 'config' | 'labelConfig'>;

export const GoodsListFilters = {
  NO_INDEX: 'noIndex',
  CATEGORY: 'category',
  MANUFACTURER: 'manufacturer',
  SERIES: 'series',
  BRAND: 'brand',
  NAME: 'name',
  ARTICLE: 'article',
} as const;

export type GoodsListFilterKey = (typeof GoodsListFilters)[keyof typeof GoodsListFilters];

export interface ICatalogFilters {
  [GoodsListFilters.NO_INDEX]: boolean;
  [GoodsListFilters.CATEGORY]: string;
  [GoodsListFilters.MANUFACTURER]: string;
  [GoodsListFilters.SERIES]: string[];
  [GoodsListFilters.BRAND]: string[];
  [GoodsListFilters.NAME]: string;
  [GoodsListFilters.ARTICLE]: string;
}

export type GoodsListSidxType = 'name' | 'gdscode' | '';

export const NoIndexChecks = {
  NOT_CHECKED: 'notChecked',
  NO_UNPUBLISHED: 'noUnpublished',
  HAS_UNPUBLISHED: 'hasUnpublished',
} as const;

export type NoIndexChecksType = (typeof NoIndexChecks)[keyof typeof NoIndexChecks];

export interface ICategory {
  name: string;
  options: Array<{ label: string; value: string | number }>;
}

export interface IUnpublishedFiles {
  page: number;
  rows: number;
  records: number;
  unpublishedGoods: IUnpublishGoodsFilesDataItem[];
}

export interface ICatalogState extends Record<CatalogComputedPropertyStateType, IDefaultReportsState> {
  characteristicReports: {
    page: number;
    rows: number;
    records: number;
    filesData: ICharacteristicsReportsData[];
  };
  goodsList: {
    listStatus: (typeof NoIndexChecks)[keyof typeof NoIndexChecks];
    records: number;
    data: ICatalogTableItems[];
    rows: number;
    page: number;
    sort: GoodsListSidxType;
    sortValue: SortOrderType;
    filters: ICatalogFilters;
    unpublishedFiles: IUnpublishedFiles;
  };
  configChars: Partial<Record<keyof typeof CategoryCharCode, ICategory>>;
}

export interface IGoodsListDataActionState {
  rows: ICatalogTableItems[];
  records: number;
}

export interface IGoodsListPageActionState {
  rows: number;
  page: number;
}

export interface IGoodsListSorterActionState {
  sortStatus: SortOrderType;
  sidx: GoodsListSidxType;
}

export interface ICatalogFiltersActionState {
  filterData: ICatalogFilters;
}

export interface ISetReportsDataActionState {
  records: number;
  data: IReportsFilesData[];
  computedProperty: CatalogComputedPropertyStateType;
}
export interface ISetReportsFilesDataActionState {
  records: number;
  data: IReportsFiles[];
  total: number;
  page: number;
  computedProperty: CatalogComputedPropertyStateType;
}
export interface ISetReportsSortActionState {
  sortStatus: SortOrderType;
  sortDate: SortOrderType;
  sidx: string;
  computedProperty: CatalogComputedPropertyStateType;
}

export interface ISetReportsPageActionState {
  page: number;
  rows: number;
  computedProperty: CatalogComputedPropertyStateType;
}

export interface ISetReportsFiltersState {
  filters: Partial<IDefaultReportsState['filters']>;
  computedProperty: CatalogComputedPropertyStateType;
}

export interface IResetReportsFilterState {
  computedProperty: CatalogComputedPropertyStateType;
  key: ReportsFilterType;
}

export interface IResetGoodsListFilterAction {
  key: GoodsListFilterKey;
  value?: string;
}

export interface IUnpublishedFilesDataActionState {
  page: number;
  records: number;
  rows: IUnpublishGoodsFilesDataItem[];
}
