import { objectPropertyProxy } from '@shared/lib';

import { commonData, manualsData } from '../../PricingPage.data';
import { IInfoDataType } from '../../PricingPage.types';
import { description } from '../PurchasePage.data';

export const dataTestId = 'pricing-control';
export const purchaseInfoData: IInfoDataType = objectPropertyProxy({
  infoTitle: 'Загрузка цен товаров',
  fileLoadData: {
    ...commonData,
    template: { name: description.name, path: description.path },
  },
  manualsData,
});
