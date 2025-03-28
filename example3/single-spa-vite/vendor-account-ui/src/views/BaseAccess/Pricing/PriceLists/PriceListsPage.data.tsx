import { Routes } from '@app/routes/root.types';
import { objectPropertyProxy } from '@shared/lib/utils/helpers/objectPropertyProxy';
import { docsPath } from '@views/BaseAccess/BaseAccessPage.data';

import { commonData, manualsData } from '../PricingPage.data';

import { DescriptionType, PriceListsInfoDataType } from './PriceListsPage.types';

export const heading = 'Управление прайс-листами';

export const KeyTab = {
  [Routes.PL]: Routes.PL,
  [Routes.DISCOUNT]: Routes.DISCOUNT,
} as const;

export const description: DescriptionType = {
  [KeyTab.pl]: {
    descr: 'Для назначения спецпрайсов для клиентов загрузите заполненный шаблон',
    path: `${docsPath}/pricelist.xlsx`,
    name: 'Шаблон загрузки прайс-листов.xlsx',
  },
  [KeyTab.discount]: {
    descr: 'Для назначения скидки для клиентов загрузите заполненный шаблон',
    path: `${docsPath}/discount.xlsx`,
    name: 'Шаблон загрузки скидки.xlsx',
  },
};

export const templateInfoData: PriceListsInfoDataType = objectPropertyProxy({
  [KeyTab.pl]: {
    infoTitle: 'Загрузка прайс-листов',
    fileLoadData: {
      ...commonData,
      template: { name: description[KeyTab.pl].name, path: description[KeyTab.pl].path },
    },
    manualsData,
  },
  [KeyTab.discount]: {
    infoTitle: 'Загрузка скидок',
    fileLoadData: {
      ...commonData,
      template: { name: description[KeyTab.discount].name, path: description[KeyTab.discount].path },
    },
    manualsData,
  },
});
