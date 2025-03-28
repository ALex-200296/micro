import React from 'react';
import { fileFormats, getFileFormatString, IFileLoadFormProps,IManualsData } from '@features/common/ui';
import { FileType, objectPropertyProxy, ruleForFileExtension, ruleForFileSize } from '@shared/lib';
import { IButtonProps } from '@shared/ui';
import { docsPath } from '@views/BaseAccess/BaseAccessPage.data';
import { Typography } from 'antd';

import { DescriptionType, KeyTab, TabsInfoDataType } from './ControlPage.types';

import styles from './ControlPage.module.scss';

const { Link } = Typography;
export const dataTestId = 'catalog-control';
export const heading = 'Управление данными о товарах';
export const description: DescriptionType = {
  [KeyTab.characteristics]: {
    descr: '',
    name: '',
    path: '',
  },
  [KeyTab.certificates]: {
    descr:
      'Для управления сертификатами на товары загрузите заполненный файл в формате .csv, разделитель - точка с запятой',
    path: `${docsPath}/sertificate_mapping_template.xlsx`,
    name: 'Шаблон сопоставления сертификатов и товаров.xlsx',
  },
  [KeyTab.images]: {
    descr:
      'Для управления изображениями товаров загрузите заполненный файл в формате .csv, разделитель - точка с запятой',
    path: `${docsPath}/images_template.xlsx`,
    name: 'Шаблон сопоставления изображений и товаров.xlsx',
  },
  [KeyTab.description]: {
    descr: 'Для управления описаниями товаров загрузите заполненный файл в формате .csv, разделитель - точка с запятой',
    path: `${docsPath}/description_template.xlsx`,
    name: 'Шаблон загрузки описания к товару в ЛКП ЭТМ.xlsx',
  },
  [KeyTab.techInfo]: {
    descr:
      'Для управления технической информацией на товары загрузите заполненный файл в формате .csv, разделитель - точка с запятой',
    path: `${docsPath}/tech_info_template.xlsx`,
    name: 'Шаблон загрузки файлов технической информации в ЛКП ЭТМ.xlsx',
  },
  [KeyTab.analog]: {
    descr: 'Для загрузки аналогов товаров загрузите заполненный файл в формате .csv, разделитель - точка с запятой',
    path: `${docsPath}/analog_template.xlsx`,
    name: 'Шаблон сопоставления аналогов.xlsx',
  },
  [KeyTab.constructor]: {
    descr: 'Для загрузки конструктора товаров загрузите заполненный файл в формате .csv, разделитель - точка с запятой',
    path: `${docsPath}/konstructor_template.xlsx`,
    name: 'Шаблон сопоставления конструктор.xlsx',
  },
  [KeyTab.sametype]: {
    descr: 'Для загрузки однотипных товаров загрузите заполненный файл в формате .csv, разделитель - точка с запятой',
    path: `${docsPath}/sametype_temptate.xlsx`,
    name: 'Шаблон сопоставления однотипных товаров.xlsx',
  },
};

export const commonTemplateData: Omit<IFileLoadFormProps, 'onFinish' | 'template'> = {
  accept: fileFormats.csv,
  multiple: true,
  uploadHint: 'Загрузить файл в формате .csv',
  rules: [
    {
      validator: (_, value: FileType) =>
        ruleForFileExtension(
          _,
          value,
          fileFormats.csv,
          'Вы пытаетесь загрузить файл с недопустимым расширением, удалите его и загрузите файл с расширением .csv',
        ),
    },
    {
      validator: (_, value: FileType) => ruleForFileSize(_, value),
    },
  ],
  descriptions: [
    {
      title: 'Правила загрузки файлов',
      text: [
        { label: 'Формат файлов', name: 'CSV (разделители - запятые) (.csv)' },
        { label: 'Кодировка', name: 'Win-1251' },
        { label: 'Разделитель колонок в файле', name: ' ";" (точка с запятой)' },
      ],
    },
  ],
};

export const manualsData: IManualsData[] = [
  {
    name: 'Регламент',
    data: [
      {
        name: 'Требования к разделу',
        to: `${docsPath}/specification_catalog.docx`,
        downLoadName: 'Приложение 1 к Согл-ию (Требования_каталог).docx',
      },
      {
        name: 'Регламент работы',
        to: `${docsPath}/regulation_catalog.docx`,
        downLoadName: 'Регламент iPRO OneTeam (раздел Каталог).docx',
      },
    ],
  },
  {
    name: 'Инструкции',
    data: [
      {
        name: 'Инструкция по работе в разделе',
        to: `${docsPath}/instruction_catalog.docx`,
        downLoadName: 'Инструкция по предоставлению данных для каталога товаров iPRO_new.docx',
      },
      {
        name: 'Обзор обновлений iPRO OneTeam',
        video: true,
        to: `${docsPath}/review_new.mp4`,
        thumbnail: `${docsPath}/review_new.png`,
      },
      {
        name: 'Наполнение карточек товаров данными',
        video: true,
        to: `${docsPath}/add_data_goods.mp4`,
        thumbnail: `${docsPath}/add_data_goods.png`,
      },
      {
        name: 'Загрузка доп.контента в карточку товара',
        video: true,
        to: `${docsPath}/goods_extra_content.mp4`,
        thumbnail: `${docsPath}/goods_extra_content.png`,
      },
      {
        name: 'Новая карточка товара в iPRO',
        video: true,
        to: `${docsPath}/new_card.mp4`,
        thumbnail: `${docsPath}/new_card.png`,
      },
    ],
  },
];

export const tabsInfoData: TabsInfoDataType = objectPropertyProxy({
  [KeyTab.characteristics]: {
    templateTitle: 'Загрузка сопоставления характеристик товаров',
    templateFileLoadData: {
      ...commonTemplateData,
      template: { name: description[KeyTab.characteristics].name, path: description[KeyTab.characteristics].path },
    },
    manualsData: [
      ...manualsData,
      {
        name: 'Справочники',
        data: [
          {
            name: 'Справочник значений характеристик',
            to: `${docsPath}/characteristics_manual.xlsx`,
          },
        ],
      },
    ],
  },
  [KeyTab.certificates]: {
    templateTitle: 'Загрузка сопоставления сертификатов товаров',
    uploaditle: 'Загрузка сертификатов товаров',
    templateFileLoadData: {
      ...commonTemplateData,
      template: { name: description[KeyTab.certificates].name, path: description[KeyTab.certificates].path },
    },
    sectionFileLoadData: {
      accept: fileFormats.pdf,
      multiple: true,
      uploadHint: 'Загрузите файлы в формате .pdf',
      fileSizeAccept: 10,
      message: 'Вы можете загрузить до 100 файлов за один раз.\nМаксимальный размер одного файла 10 Мб.',
      rules: [
        {
          validator: (_, value: FileType) =>
            ruleForFileExtension(
              _,
              value,
              fileFormats.pdf,
              'Вы пытаетесь загрузить файл с недопустимым расширением, удалите его и загрузите файл с расширением .pdf',
            ),
        },
        {
          validator: (_, value: FileType) => ruleForFileSize(_, value, 10),
        },
      ],
      descriptions: [
        {
          title: 'Правила загрузки файлов',
          text: [{ label: 'Формат файлов', name: '(.pdf)' }],
        },
      ],
    },
    manualsData,
  },
  [KeyTab.images]: {
    templateTitle: 'Загрузка сопоставления изображений товаров',
    uploaditle: 'Загрузка изображений товаров',
    templateFileLoadData: {
      ...commonTemplateData,
      template: { name: description[KeyTab.images].name, path: description[KeyTab.images].path },
    },
    sectionFileLoadData: {
      accept: getFileFormatString(fileFormats.image, fileFormats.gif),
      multiple: true,
      uploadHint: 'Загрузите файлы в формате .png, .jpg или .gif',
      rules: [
        {
          validator: (_, value: FileType) =>
            ruleForFileExtension(
              _,
              value,
              getFileFormatString(fileFormats.image, fileFormats.gif),
              'Вы пытаетесь загрузить файл с недопустимым расширением, удалите его и загрузите файл с расширением .png, .jpg или .gif',
            ),
        },
        {
          validator: (_, value: FileType) => ruleForFileSize(_, value),
        },
      ],
      descriptions: [
        {
          title: 'Правила загрузки файлов',
          text: [{ label: 'Формат файлов', name: '(.png), (.jpg), (.gif)' }],
        },
      ],
    },
    manualsData,
  },
  [KeyTab.description]: {
    templateTitle: 'Загрузка описаний товаров',
    templateFileLoadData: {
      ...commonTemplateData,
      template: { name: description[KeyTab.description].name, path: description[KeyTab.description].path },
    },
    manualsData,
  },
  [KeyTab.techInfo]: {
    templateTitle: 'Загрузка сопоставления технической информации товаров',
    uploaditle: 'Загрузка файлов технической информации товаров',
    templateFileLoadData: {
      ...commonTemplateData,
      template: { name: description[KeyTab.techInfo].name, path: description[KeyTab.techInfo].path },
    },
    sectionFileLoadData: {
      accept: getFileFormatString(
        fileFormats.video,
        fileFormats.pdf,
        fileFormats.autodesk,
        fileFormats.cad,
        fileFormats.text,
      ),
      multiple: true,
      uploadHint: 'Загрузите файлы в формате .pdf, .step, .stp, .3ds, .ifc, .dxf, .dwg, .mp4 или .txt',
      rules: [
        {
          validator: (_, value: FileType) =>
            ruleForFileExtension(
              _,
              value,
              getFileFormatString(
                fileFormats.video,
                fileFormats.pdf,
                fileFormats.autodesk,
                fileFormats.cad,
                fileFormats.text,
              ),
              'Вы пытаетесь загрузить файл с недопустимым расширением, удалите его и загрузите файлы с расширением .pdf, .step, .stp, .3ds, .ifc, .dxf, .dwg, .mp4 или .txt',
            ),
        },
        {
          validator: (_, value: FileType) => ruleForFileSize(_, value),
        },
      ],
      descriptions: [
        {
          title: 'Правила загрузки файлов',
          text: [
            { label: 'Формат файлов', name: '(.pdf), (.step), (.stp), (.3ds), (.ifc), (.dxf), (.dwg), (.mp4), (.txt)' },
          ],
        },
      ],
    },
    manualsData,
  },
  [KeyTab.analog]: {
    templateTitle: 'Загрузка аналогов товаров',
    templateFileLoadData: {
      ...commonTemplateData,
      subtitle:
        'Аналоги - товары одного ценового диапазона, полностью соответствующие друг другу по техническим характеристикам',
      template: { name: description[KeyTab.analog].name, path: description[KeyTab.analog].path },
    },
    manualsData,
  },
  [KeyTab.constructor]: {
    templateTitle: 'Загрузка конструктора товаров',
    templateFileLoadData: {
      ...commonTemplateData,
      subtitle: 'Конструктор - объединяет технически совместимое дополнительное оборудование к товарам',
      template: { name: description[KeyTab.constructor].name, path: description[KeyTab.constructor].path },
    },
    manualsData,
  },
  [KeyTab.sametype]: {
    templateTitle: 'Загрузка однотипных товаров',
    templateFileLoadData: {
      ...commonTemplateData,
      template: { name: description[KeyTab.sametype].name, path: description[KeyTab.sametype].path },
    },
    manualsData,
  },
});

export const getExtraFileLoadProps = (disabled: boolean, onTooltipAction: () => void): IButtonProps => ({
  disabled,
  dataTestId,
  ...(disabled
    ? {
        tooltipProps: {
          title: (
            <>
              <span>Невозможно загрузить файлы, т.к. к вашей организации не привязан производитель. </span>
              <Link onClick={onTooltipAction} className={styles.tooltip_link} data-testid={`tooltip-${dataTestId}`}>
                Отправить запрос в службу поддержки.
              </Link>
            </>
          ),
        },
      }
    : {}),
});
