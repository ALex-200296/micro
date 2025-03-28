import { IFilesWithNumState } from '@features/common/ui';
import { FileType } from '@shared/lib';

export interface IVendorHoldingState {
  hasContract: boolean;
  address: string;
}

export interface IVendorInitialValues {
  typeOfContract: string;
  signTheContract: string;
  orgName: string;
  kpp: string;
  inn: string;
  orgCategory: string;
  goodsCategory: string[];
  goodsExtraCategory: string;
  brands: string;
  orgSite: string;
  orgCatalogLink: string;
  fio: string;
  position: string;
  email: string;
  phone: string;
  deJuroAddress: string;
  deFactoAddress: string;
  warehouses: string[];
  holdings: IVendorHoldingState[];
  orgPartners: string;
  sum: string;
  files: FileType;
}

export type CreateFileReturnType = {
  files: File[];
  numForFiles: IFilesWithNumState[];
};

export type LinksForForm = {
  href: string;
  name: string;
};