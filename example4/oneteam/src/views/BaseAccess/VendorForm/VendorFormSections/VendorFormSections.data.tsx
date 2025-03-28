import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { fileFormats, getFileFormatString } from '@features/common/ui';
import { FileType, ruleForFileExtension, ruleForFileSize } from '@shared/lib';
import { IFormItemProps } from '@shared/ui';
import { docsPath } from '@views/BaseAccess/BaseAccessPage.data';
import { Tooltip } from 'antd';

import { dataTestId } from '../VendorForm.data';
import { IVendorHoldingState, IVendorInitialValues, LinksForForm } from '../VendorForm.types';

import {
  commonInfoFields,
  contactInfoFields,
  contractPreviewFields,
  organizationInfoFields,
} from './VendorFormSections.types';

const urlRegexp =
  /^(?:((http:)|(https:))\/\/)?(?:[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]+(?:\.[a-zA-Z]+)*|(?:[а-яА-ЯёЁ0-9-]+(?:\.[а-яА-ЯёЁ0-9-]+)*\.[а-яА-ЯёЁ]+(?:\.[а-яА-ЯёЁ]+)*))(?::[0-9]+)?(?:\/.*)?$/;

const rules: IFormItemProps['rules'] = [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }];

export const commonInfoFieldsProps: Record<
  keyof Pick<IVendorInitialValues, commonInfoFields>,
  Omit<IFormItemProps, 'children'>
> = {
  orgName: {
    label: 'Наименование организации',
    name: 'orgName',
    rules,
    id: 'orgName',
  },
  inn: {
    label: 'ИНН',
    name: 'inn',
    rules,
    id: 'inn',
  },
  kpp: {
    label: 'КПП',
    name: 'kpp',
    rules,
    id: 'kpp',
  },
  orgCategory: {
    label: 'Выберите категорию организации',
    name: 'orgCategory',
    rules,
    id: 'orgCategory',
  },
  goodsCategory: {
    label: 'Какие товары вы предлагаете?',
    name: 'goodsCategory',
    rules,
    id: 'goodsCategory',
  },
  goodsExtraCategory: {
    label: 'Другие категории товаров',
    name: 'goodsExtraCategory',
    id: 'goodsExtraCategory',
  },
  brands: {
    label: 'Бренды ваших товаров',
    name: 'brands',
    rules,
    id: 'brands',
  },
  orgSite: {
    label: 'Укажите адрес сайта организации',
    rules: [...rules, { pattern: urlRegexp, message: 'Введен некорректный url' }],
    name: 'orgSite',
    id: 'orgSite',
  },
  orgCatalogLink: {
    name: 'orgCatalogLink',
    label: 'Ссылка на эл. каталог товаров',
    rules: [...rules, { pattern: urlRegexp, message: 'Введен некорректный url' }],
    id: 'orgCatalogLink',
  },
};
interface ListFormItemProps {
  listFormItemProps?: Record<keyof IVendorHoldingState, Omit<IFormItemProps, 'children'>>;
}
export const contactInfoFieldsProps: Record<
  keyof Pick<IVendorInitialValues, contactInfoFields>,
  Omit<IFormItemProps, 'children'> & ListFormItemProps
> = {
  fio: {
    label: 'Ваше имя, фамилия и отчество',
    name: 'fio',
    rules,
    id: 'fio',
  },
  position: {
    label: 'Ваша должность',
    name: 'position',
    rules,
    id: 'position',
  },
  email: {
    label: 'Ваш адрес электронной почты',
    name: 'email',
    rules: [...rules, { type: 'email', message: 'Введен некорректный email' }],
    id: 'email',
  },
  phone: {
    label: 'Ваш мобильный телефон',
    name: 'phone',
    rules,
    id: 'phone',
  },
  deJuroAddress: {
    label: 'Юридический адрес организации',
    name: 'deJuroAddress',
    rules,
    id: 'deJuroAddress',
  },
  deFactoAddress: {
    label: 'Фактический адрес организации',
    rules,
    name: 'deFactoAddress',
    id: 'deFactoAddress',
  },
  warehouses: {
    name: 'warehouses',
    label: 'Склад №',
    rules,
    id: 'warehouses',
  },
  holdings: {
    name: 'holdings',
    label: 'Укажите название и ИНН холдинга',
    listFormItemProps: {
      hasContract: {
        label: 'Есть договор с холдингом',
        name: 'hasContract',
      },
      address: {
        name: 'address',
      },
    },
    id: 'holdings',
  },
};
export const availableFileFormats: string = getFileFormatString(
  fileFormats.pdf,
  fileFormats.image,
  fileFormats.excel,
  fileFormats.csv,
  fileFormats.xls,
  fileFormats.text,
  fileFormats.jpeg,
  fileFormats.word,
  fileFormats.zip,
  fileFormats.sevenZip,
  fileFormats.rar,
);
export const organizationInfoFieldsProps: Record<
  keyof Pick<IVendorInitialValues, organizationInfoFields>,
  Omit<IFormItemProps, 'children'>
> = {
  orgPartners: {
    label: 'Партнёры по реализации продукции',
    name: 'orgPartners',
    id: 'orgPartners',
  },
  sum: {
    label: 'Объём поставок в год (рубли)',
    rules,
    name: 'sum',
    id: 'sum',
  },
  files: {
    name: 'files',
    inputType: 'file',
    rules: [
      {
        validator: (_, values: FileType) =>
          ruleForFileExtension(
            _,
            values,
            availableFileFormats,
            `Вы пытаетесь загрузить файл с недопустимым расширением, удалите его и загрузите файлы с расширением ${availableFileFormats}`,
          ),
      },
      {
        validator: (_, value: FileType) => ruleForFileSize(_, value),
      },
    ],
  },
};

export const alertUploadWarning = 'Максимальный размер одного файла 100Мб.';

export const contractPreviewFieldProps: Record<
  keyof Pick<IVendorInitialValues, contractPreviewFields>,
  Omit<IFormItemProps, 'children'>
> = {
  signTheContract: {
    name: 'signTheContract',
    id: 'signTheContract',
    rules,
  },
  typeOfContract: {
    name: 'typeOfContract',
    id: 'typeOfContract',
    rules,
  },
};

export const contractPreviewOptions = [
  {
    value: 'Договор поставки',
    label: (
      <Tooltip title='Вы являетесь Поставщиком, ЭТМ – Покупателем. Вы поставляете товар в ЭТМ, а ЭТМ принимает и оплачивает товар согласно условиям договора для реализации Покупателям (дистрибьюторская схема)'>
        Договор поставки <QuestionCircleOutlined data-testid={`${dataTestId}-sections`} />
      </Tooltip>
    ),
  },
  {
    value: 'Агентский договор',
    label: (
      <Tooltip title='Вы являетесь Принципалом, ЭТМ – Агентом. Вы поручаете ЭТМ за вознаграждение осуществлять от вашего имени реализацию ваших товаров Покупателям через сайт ЭТМ (схема маркетплейс). Продажа товара Покупателю осуществляется на основании прямого договора поставки между вами и Покупателем или акцепта оферты заказа Покупателем'>
        Агентский договор <QuestionCircleOutlined data-testid='vendor-form-sections' />
      </Tooltip>
    ),
  },
];

export const signTheContractOptions = [
  'Готов подписать договор на указанных в нём условиях',
  'Хочу внести изменения в условия договора',
];

export const contractPreviewDocs: Record<string, LinksForForm[]> = {
  ['Договор поставки']: [
    {
      href: `${docsPath}/contract.pdf`,
      name: 'Договор поставщика',
    },
    {
      href: `${docsPath}/attach1.pdf`,
      name: 'Приложение 1 Протокол согласования скидок и отсрочки',
    },
    {
      href: `${docsPath}/attach2.pdf`,
      name: 'Приложение 2 Соглашение об  информационном взаимодействии с партнёрами',
    },
    {
      href: `${docsPath}/interactionRules.pdf`,
      name: 'Общие правила взаимодействия по договору поставки',
    },
    {
      href: `${docsPath}/conventionOneTeam.pdf`,
      name: 'Соглашение об использовании сервиса iPRO OneTeam',
    },
  ],
  ['Агентский договор']: [
    { name: 'Агентский договор', href: `${docsPath}/agent_contract.pdf` },
    {
      name: 'Приложение 1 Агентское вознаграждение',
      href: `${docsPath}/agent_attach1.pdf`,
    },
    {
      name: 'Приложение 2 Логистические услуги',
      href: `${docsPath}/agent_attach2.pdf`,
    },
    {
      name: 'Приложение 3 Ручательство',
      href: `${docsPath}/agent_attach3.pdf`,
    },
    {
      name: 'Приложение 4 Отчёт агента',
      href: `${docsPath}/agent_attach4.pdf`,
    },
    {
      name: 'Приложение 5 Соглашение ЭДО',
      href: `${docsPath}/agent_attach5.pdf`,
    },
    {
      name: 'Приложение 6 Доверенность Агенту',
      href: `${docsPath}/agent_attach6.pdf`,
    },
    {
      name: 'Общие правила взаимодействия по схеме Маркетплейс',
      href: `${docsPath}/interactionRulesMP.pdf`,
    },
    {
      name: 'Соглашение об использовании сервиса iPRO OneTeam',
      href: `${docsPath}/conventionOneTeam.pdf`,
    },
  ],
};
