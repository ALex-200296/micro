import { CategoryCharCode, IGoodsListItem, IUnpublishGoodsFilesDataItem } from '@middleware/catalog/catalog.types';
import { IReportsFiles, IReportsFilesData } from '@middleware/reports/reports.types';
import { IDefaultReportsState, ReportsFilter, SortOrderType } from '@store/root.types';

export enum CatalogComputedPropertyState {
  goodsLoad = 'goodsLoad',
  newGoodsLoad = 'newGoodsLoad',
  certificatesLoad = 'certificatesLoad',
  imagesLoad = 'imagesLoad',
  descriptionLoad = 'descriptionLoad',
  techInfoLoad = 'techInfoLoad',
  priceLoad = 'priceLoad',
  analogLoad = 'analogLoad',
  constructorLoad = 'constructorLoad',
  sametypeLoad = 'sametypeLoad',
}
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

export const goodsListFilters = {
  noIndex: 'noIndex',
  category: 'category',
  manufacturer: 'manufacturer',
  series: 'series',
  brand: 'brand',
  name: 'name',
  article: 'article',
} as const;

export type GoodsListFilterKey = (typeof goodsListFilters)[keyof typeof goodsListFilters];

export interface ICatalogFilters {
  [goodsListFilters.noIndex]: boolean;
  [goodsListFilters.category]: string;
  [goodsListFilters.manufacturer]: string;
  [goodsListFilters.series]: string[];
  [goodsListFilters.brand]: string[];
  [goodsListFilters.name]: string;
  [goodsListFilters.article]: string;
}

export type GoodsListSidxType = 'name' | 'gdscode' | '';

export const NoIndexChecks = {
  notChecked: 'notChecked',
  noUnpublished: 'noUnpublished',
  hasUnpublished: 'hasUnpublished',
} as const;

export interface Category {
  name: string;
  options: Array<{ label: string; value: string | number }>;
}

export interface UnpublishedFiles {
  page: number;
  rows: number;
  records: number;
  unpublishedGoods: IUnpublishGoodsFilesDataItem[];
}

export interface ICatalogState extends Record<keyof typeof CatalogComputedPropertyState, IDefaultReportsState> {
  characteristicReports: {
    page: number;
    rows: number;
    records: number;
    filesData: ICharacteristicsReportsData[];
  };
  goodsList: {
    listStatus: keyof typeof NoIndexChecks;
    records: number;
    data: ICatalogTableItems[];
    rows: number;
    page: number;
    sort: GoodsListSidxType;
    sortValue: SortOrderType;
    filters: ICatalogFilters;
    unpublishedFiles: UnpublishedFiles;
  };
  configChars: Partial<Record<keyof typeof CategoryCharCode, Category>>;
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
  computedProperty: keyof typeof CatalogComputedPropertyState;
}
export interface ISetReportsFilesDataActionState {
  records: number;
  data: IReportsFiles[];
  total: number;
  page: number;
  computedProperty: keyof typeof CatalogComputedPropertyState;
}
export interface ISetReportsSortActionState {
  sortStatus: SortOrderType;
  sortDate: SortOrderType;
  sidx: string;
  computedProperty: keyof typeof CatalogComputedPropertyState;
}

export interface ISetReportsPageActionState {
  page: number;
  rows: number;
  computedProperty: keyof typeof CatalogComputedPropertyState;
}

export interface ISetReportsFiltersState {
  filters: Partial<IDefaultReportsState['filters']>;
  computedProperty: keyof typeof CatalogComputedPropertyState;
}

export interface IResetReportsFilterState {
  computedProperty: keyof typeof CatalogComputedPropertyState;
  key: keyof typeof ReportsFilter;
}

export interface IResetGoodsListFilterAction {
  key: keyof typeof goodsListFilters;
  value?: string;
}

export interface IUnpublishedFilesDataActionState {
  page: number;
  records: number;
  rows: IUnpublishGoodsFilesDataItem[];
}
