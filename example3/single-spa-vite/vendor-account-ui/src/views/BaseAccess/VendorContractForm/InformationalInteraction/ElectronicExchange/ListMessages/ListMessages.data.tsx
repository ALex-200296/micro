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
  [ListMessagesKey.ELECTRONIC_ARRIVAL]: {
    text: 'Электронный приход INVOIC',
  },
  [ListMessagesKey.ELECTRONIC_ORDER]: {
    text: 'Электронный заказ ORDER',
  },
  [ListMessagesKey.CONFIRM_ORDER]: {
    text: 'Подтверждение заказа ORDERSP',
  },
  [ListMessagesKey.NOMENCLATURE_FILE_REMAINS]: {
    text: 'Номенклатурный файл (остатки) INVRPT',
  },
  [ListMessagesKey.NOMENCLATURE_FILE_PRICE]: {
    text: 'Номенклатурный файл (цены) INVRPT',
  },
  [ListMessagesKey.ESTIMATED_DELIVERY]: {
    text: 'Электронный запрос сроков поставки ORDER /ORDERSP',
  },
  [ListMessagesKey.SPECIAL_CONDITIONS]: {
    text: 'Электронный запрос спецусловий ORDER /ORDERSP',
  },
  [ListMessagesKey.NOMENCLATURE_FILE_CHARACTERISTICS]: {
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
        StepKey.INFORMATIONAL_INTERACTION,
        InformationalInteractionKey.ELECTRONIC_EXCHANGE,
        ElectronicExchangeKey.LIST_MESSAGES,
        key,
      ],
      ...value,
    };
  });
};
