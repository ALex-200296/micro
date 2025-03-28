import { Routes } from '@app/routes/root.types';
import { IFileLoadFormProps, IManualsData } from '@features/common/ui';
import { IDescription } from '@views/BaseAccess/BaseAccessPage.types';

export const KeyTab = {
  [Routes.STATUS]: Routes.STATUS,
  [Routes.TERM]: Routes.TERM,
} as const;

export type KeyType = (typeof KeyTab)[keyof typeof KeyTab];

export type DescriptionType = { [key in KeyType]: IDescription };

export type TabsInfoDataType = {
  [key in KeyType]: {
    templateTitle: string;
    templateFileLoadData: Omit<IFileLoadFormProps, 'onFinish'>;
    manualsData: IManualsData[];
    sectionFileLoadData?: Omit<IFileLoadFormProps, 'onFinish'>;
  };
};
export interface ISubSectionProps {
  id: KeyType;
}
