import { fileFormats, IFileLoadFormProps } from '@features/common/ui';
import { IManualsData } from '@features/common/ui/Manuals/Manuals.types';
import { FileType, ruleForFileExtension, ruleForFileSize } from '@shared/lib';

import { docsPath } from '../BaseAccessPage.data';

export const manualsData: IManualsData[] = [
  {
    name: 'Инструкции',
    data: [
      {
        name: 'Обзор обновлений iPRO OneTeam',
        video: true,
        to: `${docsPath}/review_new.mp4`,
        thumbnail: `${docsPath}/review_new.png`,
      },
    ],
  },
];

export const commonData: Omit<IFileLoadFormProps, 'onFinish' | 'template'> = {
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
