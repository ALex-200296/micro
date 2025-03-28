import { Routes } from '@app/routes/root.types';
import { IFileLoadFormProps, IManualsData } from '@features/common/ui';
import { IDescription } from '@views/BaseAccess/BaseAccessPage.types';

export const KeyTab = {
  [Routes.Characteristics]: Routes.Characteristics,
  [Routes.Certificates]: Routes.Certificates,
  [Routes.Images]: Routes.Images,
  [Routes.Description]: Routes.Description,
  [Routes.TechInfo]: Routes.TechInfo,
  [Routes.Analog]: Routes.Analog,
  [Routes.Constructor]: Routes.Constructor,
  [Routes.SameType]: Routes.SameType,
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
