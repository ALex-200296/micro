import { fileFormats, IFileLoadFormProps, IManualsData } from '@features/common/ui';
import { FileType, ruleForFileExtension, ruleForFileSize } from '@shared/lib';
import { docsPath } from '@views/BaseAccess/BaseAccessPage.data';

export const templateTitle = 'Загрузка заявки на ввод ассортимента';
export const templateData = {
  name: 'Шаблон и инструкция - Заявка на ввод в складской ассортимент.xlsx',
  path: `${docsPath}/storage_assortment_template.xlsx`,
};
export const dataTestId = 'logistic-management';

export const fileLoadFormProps: Omit<IFileLoadFormProps, 'onFinish'> = {
  template: templateData,
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

export const heading = 'Управление складским ассортиментом';
export const description =
  'Для создания заявки на ввод ассортимента на склады ЭТМ загрузите заполненный файл в формате .csv, разделитель - точка с запятой';

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
