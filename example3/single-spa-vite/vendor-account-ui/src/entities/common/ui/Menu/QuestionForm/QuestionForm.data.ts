import { Routes } from '@app/routes/root.types';
import { IInfoSearchState } from '@app/store/info/info.types';
import { fileFormats, getFileFormatString, IFileInputProps } from '@features/common/ui';
import { FileType, ruleForFileExtension, ruleForFileSize } from '@shared/lib';
import { TextAreaProps } from 'antd/es/input';

import { IFieldsPropsState, IQuestionFormState } from './QuestionForm.types';

export const dataTestId = 'question-form';

export const browsers: { label: string; value: string }[] = [
  { label: 'Google Chrome', value: 'Google Chrome' },
  { label: 'Mozilla Firefox', value: 'Mozilla Firefox' },
  { label: 'Opera', value: 'Opera' },
  { label: 'Яндекс Браузер', value: 'Яндекс Браузер' },
  { label: 'Microsoft Edge', value: 'Microsoft Edge' },
  { label: 'Safari', value: 'Safari' },
  { label: 'другое', value: 'другое' },
];

export const formats =
  '.csv, .xls, .xlsx, .doc, .docx, .pdf, .mp4, .step, .stp, .3ds, .ifc, .dxf, .dwg, .jpg, .jpeg, .png, .rtf, .odt, .ods, .odg, .zip, .rar, .arj, .7z, .gif, .txt';

export const uploadHint = `Загрузить файл в формате ${formats}`;

export const acceptError = `Вы пытаетесь загрузить файл с недопустимым расширением, удалите его и загрузите файлы с расширением  ${formats}`;

const fileFormatsForUploading = getFileFormatString(
  fileFormats.pdf,
  fileFormats.image,
  fileFormats.excel,
  fileFormats.csv,
  fileFormats.video,
  fileFormats.cad,
  fileFormats.autodesk,
  fileFormats.gif,
  fileFormats.jpeg,
  fileFormats.odg,
  fileFormats.xls,
  fileFormats.ods,
  fileFormats.word,
  fileFormats.oldWord,
  fileFormats.zip,
  fileFormats.rar,
  fileFormats.sevenZip,
  fileFormats.arj,
  fileFormats.text,
);

export const fieldsProps: IFieldsPropsState = {
  theme: {
    name: 'theme',
    label: 'Тема обращения',
    labelType: 'float',
    rules: [{ required: true, message: 'Обязательное поле', type: 'string' }],
  },
  email: {
    name: 'email',
    label: 'Email',
    labelType: 'float',
    rules: [
      { required: true, message: 'Обязательное поле' },
      { required: true, message: 'некорректный email', type: 'email' },
    ],
  },
  browser: {
    name: 'browser',
    label: 'Браузер',
    labelType: 'float',
    rules: [{ required: true, message: 'Обязательное поле' }],
  },
  description: {
    name: 'description',
    label: 'Описание',
    labelType: 'float',
    rules: [{ required: true, message: 'Обязательное поле', type: 'string' }],
  },
  files: {
    name: 'files',
    inputType: 'file',
    dependencies: ['theme'],
    rules: [
      {
        validator: (_, values: FileType) => ruleForFileExtension(_, values, fileFormatsForUploading, acceptError),
      },
      ({ getFieldValue }) => ({
        validator(_, files) {
          if (!files.fileList.length && getFieldValue('theme') === 'Документы для аккредитации') {
            return Promise.reject('Пожалуйста, вложите в обращение документы для аккредитации');
          }
          return Promise.resolve();
        },
      }),
      {
        validator: (_, value: FileType) => ruleForFileSize(_, value),
      },
    ],
  },
};

export const fileInputProps: IFileInputProps = {
  accept: fileFormatsForUploading,
  multiple: true,
  uploadHint: uploadHint,
  dataTestId,
};

export const textAreaProps: TextAreaProps = {
  autoSize: { minRows: 3, maxRows: 3 },
  allowClear: true,
};
const helpTheme: Record<string, string> = {
  [Routes.IMAGES]: 'Изображения',
  [Routes.TECH_INFO]: 'Техническая информация',
};

export const getHelpFormInitialState = (
  prefillForm: boolean,
  email: string,
  tabName: string = '',
): IQuestionFormState => ({
  email: email || '',
  theme: prefillForm ? helpTheme?.[tabName] : '',
  browser: prefillForm ? 'другое' : '',
  description: prefillForm ? 'К организации поставщика необходимо привязать производителя' : '',
  files: {
    file: null,
    fileList: [],
  },
});

export const getIsClientUploadOpt = (options: IInfoSearchState[], theme: string): boolean =>
  options.find((option) => option.code === '25')?.value === theme;

export const getThemeOptionsData = (isAuth: boolean, themeOptionsData: IInfoSearchState[]) =>
  isAuth ? themeOptionsData : themeOptionsData.filter((item) => item.code !== '25');
