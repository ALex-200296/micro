import {
  IConfigChars,
  IGoodsFilesData,
  IGoodsFilesDataItem,
  IGoodsListItem,
  IRSupplierResponse,
  IUnpublishGoodsFilesDataItem,
} from '@middleware/catalog/catalog.types';
import { ICatalogTableItems, ICategory } from '@store/catalog/catalog.types';

export type IFilesDataStateAdapterType = (data: IGoodsFilesData) => IRSupplierResponse;

export type GoodsListAdapterType = (rows: IGoodsListItem[]) => ICatalogTableItems[];

export type AdapterCatalogConfigCharsType = (data: IConfigChars[]) => Partial<Record<989 | 82, ICategory>>;

export type AdapterUnpublishedGoodsType = (items: IGoodsFilesDataItem[]) => IUnpublishGoodsFilesDataItem[];
