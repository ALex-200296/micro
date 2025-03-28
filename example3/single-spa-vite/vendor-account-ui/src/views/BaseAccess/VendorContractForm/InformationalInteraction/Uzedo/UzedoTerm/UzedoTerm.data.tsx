import { GetDataSourceType, StepKey } from '../../../VendorContractForm.types';
import { InformationalInteractionKey } from '../../InformationalInteraction.types';
import { UzedoKey } from '../Uzedo.types';

import { IDataSource, IDescriptions, IUzedoTermValues, UzedoTermKey } from './UzedoTerm.types';

export const startDateTooltipText = 'Соответствует дате реализации (запуска) EDI сообщений';
export const launchDateTooltipText = 'Не менее 1 месяца с даты начала реализации работ';

export const uzedoTermValue: IUzedoTermValues = { startDate: null, launchDate: null };

export const uzedoTermValues: Record<keyof typeof UzedoTermKey, IUzedoTermValues> = Object.fromEntries(
  Object.keys(UzedoTermKey).map((key) => [key, structuredClone(uzedoTermValue)]),
) as Record<keyof typeof UzedoTermKey, IUzedoTermValues>;

export const descriptions: Record<keyof typeof UzedoTermKey, IDescriptions> = {
  [UzedoTermKey.UPD]: {
    text: 'Электронный УПД (ЮЗЭДО)',
  },
  [UzedoTermKey.ACT_SERVICES]: {
    text: 'Акт об оказании услуг',
  },
  [UzedoTermKey.UKD]: {
    text: 'УКД',
  },
  [UzedoTermKey.ADDITIONAL_AGREEMENTS]: {
    text: 'Договор и доп.соглашения к договору',
  },
  [UzedoTermKey.SPECIFICATION]: {
    text: 'Спецификация к договору',
  },
  [UzedoTermKey.POWERS_ATTORNEY]: {
    text: 'Доверенности',
  },
  [UzedoTermKey.ACT_RECONSILIATION]: {
    text: 'Акт сверки взаимных расчётов',
  },
  [UzedoTermKey.ACT_REPORT]: {
    text: 'Акт зачёта взаимных требований',
  },
  [UzedoTermKey.ACT_DESCREPANCY]: {
    text: 'Акт расхождений при приёмке',
  },
};

export const getDataSource: GetDataSourceType<Record<keyof typeof UzedoTermKey, IUzedoTermValues>, IDataSource> = (
  initialValues,
) => {
  return Object.entries<IUzedoTermValues>(initialValues).map(([key, value]) => {
    return {
      id: [StepKey.INFORMATIONAL_INTERACTION, InformationalInteractionKey.UZEDO, UzedoKey.UZEDO_TERM, key],
      ...value,
    };
  });
};
