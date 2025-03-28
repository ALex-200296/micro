import { fileFormats, IFileLoadFormProps, IManualsData } from '@features/common/ui';
import { FileType, objectPropertyProxy, ruleForFileExtension, ruleForFileSize } from '@shared/lib';
import { docsPath } from '@views/BaseAccess/BaseAccessPage.data';

export const dataTestId = 'catalog-download';
export const heading = 'Загрузить новые товары';
export const templateTitle = 'Загрузка новых товаров';
export const description =
  'Для добавления новых товаров загрузите заполненный файл в формате .csv, разделитель - точка с запятой';
export const templateData = objectPropertyProxy(
  {
    true: {
      name: 'Шаблон для загрузки нового товара.xlsx',
      path: `${docsPath}/upload_goods_template_CU.xlsx`,
    },
    false: {
      name: 'Шаблон для загрузки нового товара.xlsx',
      path: `${docsPath}/upload_goods_template.xlsx`,
    },
  },
  'false',
);
export const fileLoadFormProps: Omit<IFileLoadFormProps, 'onFinish'> = {
  multiple: true,
  accept: fileFormats.csv,
  uploadHint: 'Загрузить файл в формате .csv',
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
};

export const title = 'Загрузка новых товаров';
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
        name: 'Загрузка нового товара',
        video: true,
        to: `${docsPath}/new_goods.mp4`,
        thumbnail: `${docsPath}/new_goods.png`,
      },
      {
        name: 'Новая карточка товара в iPRO',
        video: true,
        to: `${docsPath}/new_card.mp4`,
        thumbnail: `${docsPath}/new_card.png`,
      },
    ],
  },
  {
    name: 'Справочники',
    data: [
      {
        name: 'Справочник стран',
        to: `${docsPath}/countries_manual.xlsx`,
      },
      {
        name: 'Справочник классов товаров',
        to: `${docsPath}/class_manual.xlsx`,
      },
    ],
  },
];
