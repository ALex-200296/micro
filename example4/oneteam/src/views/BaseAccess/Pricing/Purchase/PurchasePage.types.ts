import { IFileLoadFormProps, IManualsData } from '@features/common/ui';

export type PurchaseInfoDataType = {
  infoTitle: string;
  fileLoadData: Omit<IFileLoadFormProps, 'onFinish'>;
  uploaditle?: string;
  manualsData: IManualsData[];
  sectionFileLoadData?: Omit<IFileLoadFormProps, 'onFinish'>;
};
