import { fileFormats, IFileLoadFormProps, IManualsData } from '@features/common/ui';
import { FileType, objectPropertyProxy, ruleForFileExtension, ruleForFileSize } from '@shared/lib';
import { docsPath } from '@views/BaseAccess/BaseAccessPage.data';

import { DescriptionType, KeyTab, TabsInfoDataType } from './InfoPage.types';

export const heading = 'Управление логистическими данными';
export const dataTestId = 'logistic-info';
export const description: DescriptionType = {
  [KeyTab.status]: {
    descr:
      'Для управления логистическими данными загрузите заполненный файл в формате .csv, разделитель - точка с запятой',
    path: `${docsPath}/goods_status_template.xlsx`,
    name: 'Шаблон и инструкция - Изменение статуса товара у поставщика.xlsx',
  },
  [KeyTab.term]: {
    descr: 'Для управления сроками загрузите заполненный файл в формате .csv, разделитель - точка с запятой',
    path: `${docsPath}/delivery_timelines_template.xlsx`,
    name: 'Шаблон и инструкция - Обновление сроков поставки_изготовления в каталоге.xlsx',
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
        to: `${docsPath}/specification_logistic.docx`,
        downLoadName: 'Приложение 2 к Согл-ию (Требования_Ассортимент и логистика).docx',
      },
      {
        name: 'Регламент работы',
        to: `${docsPath}/regulation_logistic.docx`,
        downLoadName: 'Регламент iPRO OneTeam (раздел Ассортимент и логистика).docx',
      },
    ],
  },
  {
    name: 'Инструкции',
    data: [
      {
        name: 'Обзор раздела «Ассортимент и логистика»',
        video: true,
        to: `${docsPath}/logistic.mp4`,
        thumbnail: `${docsPath}/logistic.png`,
      },
    ],
  },
  {
    name: 'Справочники',
    data: [
      {
        name: 'Справочник складов',
        to: `${docsPath}/warehouses_manual.xlsx`,
      },
    ],
  },
];

export const tabsInfoData: TabsInfoDataType = objectPropertyProxy({
  [KeyTab.status]: {
    templateTitle: 'Загрузка статусов товаров на складе',
    templateFileLoadData: {
      ...commonTemplateData,
      template: { name: description[KeyTab.status].name, path: description[KeyTab.status].path },
    },
    manualsData,
  },
  [KeyTab.term]: {
    templateTitle: 'Загрузка сроков изготовления и доставки товаров',
    templateFileLoadData: {
      ...commonTemplateData,
      template: { name: description[KeyTab.term].name, path: description[KeyTab.term].path },
    },
    manualsData,
  },
});
