import { fileFormats, getFileFormatString, IFileInputProps } from '@features/common/ui';
import { FileType, ruleForFileExtension, ruleForFileSize } from '@shared/lib';
import { TextAreaProps } from 'antd/lib/input/TextArea';

import { IFieldsPropsState, IInitialValuesState } from './GetAccessForm.types';

export const dataTestId = 'get-access-form';
export const subjectEmail = 'Обращение из iPRO OneTeam. Получить доступ к iPRO OneTeam';
export const formats =
  '.csv, .xls, .xlsx, .doc, .docx, .pdf, .mp4, .step, .stp, .3ds, .ifc, .dxf, .dwg, .jpg, .jpeg, .png, .rtf, .odt, .ods, .odg, .zip, .rar, .arj, .7z, .gif, .txt';

export const uploadHint = `Загрузить файл в формате ${formats}`;

export const acceptError = `Вы пытаетесь загрузить файл с недопустимым расширением, удалите его и загрузите файлы с расширением  ${formats}`;

export const initialValues: IInitialValuesState = {
  email: '',
  description: '',
  files: {
    file: null,
    fileList: [],
  },
};

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
  email: {
    name: 'email',
    label: 'Email',
    labelType: 'float',
    rules: [
      { required: true, message: 'Обязательное поле' },
      { required: true, message: 'некорректный email', type: 'email' },
    ],
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
    rules: [
      {
        validator: (_, values: FileType) => ruleForFileExtension(_, values, fileFormatsForUploading, acceptError),
      },
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
