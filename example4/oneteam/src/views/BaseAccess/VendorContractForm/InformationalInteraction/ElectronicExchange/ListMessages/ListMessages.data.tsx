import { GetDataSourceType, StepKey } from '../../../VendorContractForm.types';
import { InformationalInteractionKey } from '../../InformationalInteraction.types';
import { ElectronicExchangeKey } from '../ElectronicExchange.types';

import { IDataSource, IDescriptions, IListMessagesValues, ListMessagesKey } from './ListMessages.types';

export const startDateTooltipText = 'Соответствует дате подписания договора';
export const launchDateTooltipText = 'Не менее 3 месяцев с даты подписания договора';

export const ListMessagesValue: IListMessagesValues = { startDate: null, launchDate: null, transfer: '' };

export const listMessagesInitialValues: Record<keyof typeof ListMessagesKey, IListMessagesValues> = Object.fromEntries(
  Object.keys(ListMessagesKey).map((key) => [key, structuredClone(ListMessagesValue)]),
) as Record<keyof typeof ListMessagesKey, IListMessagesValues>;

export const descriptions: Record<keyof typeof ListMessagesKey, IDescriptions> = {
  [ListMessagesKey.electronicArrival]: {
    text: 'Электронный приход INVOIC',
  },
  [ListMessagesKey.electronicOrder]: {
    text: 'Электронный заказ ORDER',
  },
  [ListMessagesKey.confirmOrder]: {
    text: 'Подтверждение заказа ORDERSP',
  },
  [ListMessagesKey.nomenclatureFileRemains]: {
    text: 'Номенклатурный файл (остатки) INVRPT',
  },
  [ListMessagesKey.nomenclatureFilePrice]: {
    text: 'Номенклатурный файл (цены) INVRPT',
  },
  [ListMessagesKey.estimatedDelivery]: {
    text: 'Электронный запрос сроков поставки ORDER /ORDERSP',
  },
  [ListMessagesKey.specialConditions]: {
    text: 'Электронный запрос спецусловий ORDER /ORDERSP',
  },
  [ListMessagesKey.nomenclatureFileCharacteristics]: {
    text: 'Номенклатурный файл (характеристики) PRODAT',
  },
};

export const getDataSource: GetDataSourceType<
  Record<keyof typeof ListMessagesKey, IListMessagesValues>,
  IDataSource
> = (initialValues) => {
  return Object.entries<IListMessagesValues>(initialValues).map(([key, value]) => {
    return {
      id: [
        StepKey.informationalInteraction,
        InformationalInteractionKey.electronicExchange,
        ElectronicExchangeKey.listMessages,
        key,
      ],
      ...value,
    };
  });
};
