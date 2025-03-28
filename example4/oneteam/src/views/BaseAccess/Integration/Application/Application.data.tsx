import { Routes } from '@app/routes/root.types';
import { IntegrationComputedPropertyKeyType } from '@app/store/integration/integration.types';
import { IManualsData } from '@features/common/ui';
import { docsPath } from '@views/BaseAccess/BaseAccessPage.data';

export const dataTestId = 'integration';
export const heading = 'Заявка на подключение EDI/ЮЗЭДО';
export const KeyTab = {
  [Routes.Edi]: '1',
  [Routes.Uzedo]: '2',
  [Routes.EdiProject]: '3',
} as const;

export const manualsData: IManualsData[] = [
  {
    name: 'Регламент',
    data: [
      {
        name: 'Регламент работы',
        to: `${docsPath}/regulation_edo.docx`,
        downLoadName: 'Регламент работы iPRO OneTeam (раздел ЭДО).docx',
      },
    ],
  },
  {
    name: 'Инструкции',
    data: [
      {
        name: 'Инструкция по работе в разделе',
        to: `${docsPath}/instruction_edo.docx`,
        downLoadName: 'Инструкция по работе в разделе Интеграция iPRO OneTeam.docx',
      },
      {
        name: 'Спецификация форматов сообщений',
        to: `${docsPath}/ETM_EDI-MESSAGES.pdf`,
        downLoadName: 'Спецификация форматов сообщений ЭТМ EDI.pdf',
      },
      {
        name: 'Описание процесса информационного взаимодействия',
        to: `${docsPath}/desc_inf_edo.docx`,
        downLoadName: 'Описание процесса информационного взаимодействия ЭДО ЭТМ.docx',
      },
      {
        name: 'Модуль EDI ЭТМ для платформы 1С',
        to: 'https://edi.etm.ru/1c_module/',
      },
      {
        name: 'Основы ЭДО с ЭТМ',
        to: `${docsPath}/edo.mp4`,
        video: true,
        thumbnail: `${docsPath}/edo.png`,
      },
      {
        name: 'Обзор раздела Интеграция',
        video: true,
        to: `${docsPath}/integration.mp4`,
        thumbnail: `${docsPath}/integration.png`,
      },
    ],
  },
  {
    name: 'Справочники',
    data: [
      {
        name: 'Справочник складов',
        to: `${docsPath}/warehouses_edo.xlsx`,
        downLoadName: 'Справочник складов ЭТМ.xlsx',
      },
      { name: 'Реквизиты ЭТМ', to: `${docsPath}/ETM_details.pdf`, downLoadName: 'Реквизиты ЭТМ.pdf' },
    ],
  },
];

export const getLinkToEdoForm = (type: IntegrationComputedPropertyKeyType) =>
  `${process.env.VITE_APP_REDIRECT_URL}/ipro3/profile/form-edo?tab=0&vendorExchange=${type.toUpperCase()}&returnUrl=${
    process.env.VITE_APP_BASENAME
  }/${Routes.Integration}/${Routes.Application}`;
