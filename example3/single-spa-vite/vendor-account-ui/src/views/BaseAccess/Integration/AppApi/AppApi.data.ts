import { fileFormats, IFileLoadFormProps, IManualsData } from '@features/common/ui';
import { FileType, objectPropertyProxy,ruleForFileExtension, ruleForFileSize  } from '@shared/lib';
import { docsPath } from '@views/BaseAccess/BaseAccessPage.data';

export const AppApiTexts = {
  description: 'Для подачи заявки на подключение к API загрузите заполненную заявку',
  heading: 'Заявка на подключение к API',
  tollbarDownloadButtonName: 'Оставить заявку',
  filtersDrawerTitle: 'Фильтр',
};

export const dataTestId = 'integration-api';

export const templateApiApplicationInfo = {
  name: 'Шаблон на подключение к API.docx',
  path: `${docsPath}/app_api.docx`,
};
const fileLoadFormProps: Omit<IFileLoadFormProps, 'onFinish'> = {
  template: templateApiApplicationInfo,
  multiple: true,
  accept: fileFormats.word,
  uploadHint: 'Загрузить файл в формате .docx',
  fileSizeAccept: 100,
  message: 'Вы можете загрузить до 100 файлов за один раз.\nМаксимальный размер одного файла 100 Мб.',
  rules: [
    {
      validator: (_, value: FileType) =>
        ruleForFileExtension(
          _,
          value,
          fileFormats.word,
          'Вы пытаетесь загрузить файл с недопустимым расширением, удалите его и загрузите файл с расширением .docx',
        ),
    },
    {
      validator: (_, value: FileType) => ruleForFileSize(_, value),
    },
  ],
  descriptions: [
    {
      title: 'Правила загрузки файлов',
      text: [{ label: 'Формат файлов', name: '(.docx)' }],
    },
  ],
};

const manualsData: IManualsData[] = [
  {
    name: 'Регламент',
    data: [
      {
        name: 'Регламент работы',
        to: `${docsPath}/regulation_api.docx`,
      },
    ],
  },
  {
    name: 'Инструкции',
    data: [
      {
        name: 'Описание формата API ЭТМ',
        to: `${docsPath}/API_ETM_mnf.pdf`,
        isFollowExternalLink: true,
      },
    ],
  },
];

export const toolBarInfoData = objectPropertyProxy({
  infoTitle: 'Загрузка заявки на подключение к API',
  fileLoadData: fileLoadFormProps,
  manualsData,
});
