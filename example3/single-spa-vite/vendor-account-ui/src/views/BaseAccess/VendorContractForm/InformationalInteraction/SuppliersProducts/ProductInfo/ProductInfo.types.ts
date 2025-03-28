import { Dayjs } from 'dayjs';

export const ProductInfoKey = {
  IMAGE_GOOD: 'imageGood',
  CONFIGURATOR: 'configurator',
  TACHNICAL_INFO: 'technicalInfo',
  CURRENT_CERTIFICATES: 'currentCertificates',
  PRODUCT_DESCRIPTION: 'productDescription',
  ADDITIONAL_IMAGE_GOOD: 'additionalImageGood',
  VIDEO_MATERIALS: 'videoMaterials',
  MODEL_TECHNICAL_INFO: 'modelTechnicalInfo',
  CONSTRUCTOR: 'constructor',
  PRODUCT_ANALOGUES: 'productAnalogues',
  SIMILAR_PRODUCTS: 'similarProducts',
  CHARACTERISTICS_DATABASE: 'characteristicsDatabase',
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
