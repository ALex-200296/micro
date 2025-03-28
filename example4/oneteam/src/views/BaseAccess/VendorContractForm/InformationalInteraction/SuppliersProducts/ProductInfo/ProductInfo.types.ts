import { Dayjs } from 'dayjs';

export const ProductInfoKey = {
  imageGood: 'imageGood',
  configurator: 'configurator',
  technicalInfo: 'technicalInfo',
  currentCertificates: 'currentCertificates',
  productDescription: 'productDescription',
  additionalImageGood: 'additionalImageGood',
  videoMaterials: 'videoMaterials',
  modelTechnicalInfo: 'modelTechnicalInfo',
  constructor: 'constructor',
  productAnalogues: 'productAnalogues',
  similarProducts: 'similarProducts',
  characteristicsDatabase: 'characteristicsDatabase',
} as const;

export interface IProductInfoValues {
  date: Dayjs | null;
  transfer: string;
}

export interface IDataSource extends IProductInfoValues {
  id: string[];
}

export interface IDescriptions {
  text: string;
  help?: string;
}
