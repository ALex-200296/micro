import { Routes } from '@app/routes/root.types';
import { IFileLoadFormProps, IManualsData } from '@features/common/ui';
import { IDescription } from '@views/BaseAccess/BaseAccessPage.types';

export const KeyTab = {
  [Routes.CHARACTERISTICS]: Routes.CHARACTERISTICS,
  [Routes.CERTIFICATES]: Routes.CERTIFICATES,
  [Routes.IMAGES]: Routes.IMAGES,
  [Routes.DESCRIPTION]: Routes.DESCRIPTION,
  [Routes.TECH_INFO]: Routes.TECH_INFO,
  [Routes.ANALOG]: Routes.ANALOG,
  [Routes.CONSTRUCTOR]: Routes.CONSTRUCTOR,
  [Routes.SAME_TYPE]: Routes.SAME_TYPE,
} as const;

export type KeyType = (typeof KeyTab)[keyof typeof KeyTab];

export type DescriptionType = { [key in KeyType]: IDescription };

export type TabsInfoDataType = {
  [key in KeyType]: {
    templateTitle: string;
    templateFileLoadData: Omit<IFileLoadFormProps, 'onFinish'>;
    uploaditle?: string;
    manualsData: IManualsData[];
    sectionFileLoadData?: Omit<IFileLoadFormProps, 'onFinish'>;
  };
};

export interface ISubSectionProps {
  id: KeyType;
}
