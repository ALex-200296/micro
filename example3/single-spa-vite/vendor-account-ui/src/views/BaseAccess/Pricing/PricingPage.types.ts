import { IFileLoadFormProps, IManualsData } from '@features/common/ui';

export type IInfoDataType = {
  infoTitle: string;
  fileLoadData: Omit<IFileLoadFormProps, 'onFinish'>;
  uploaditle?: string;
  manualsData: IManualsData[];
  sectionFileLoadData?: Omit<IFileLoadFormProps, 'onFinish'>;
};
