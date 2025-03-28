import { fileFormats, getFileFormatString, IFileInputProps } from '@features/common/ui';
import { FileType, ruleForFileExtension, ruleForFileSize } from '@shared/lib';
import { ResultProps } from 'antd';

import { IFieldsPropsState } from './FactoringForm.types';

export const dataTestId = 'factoring-form';

export const text = 'Вложите в форму ниже коммерческое предложение для поставщика';

export const message = 'Максимальный размер одного файла 100 Мб.';

export const title = 'Заявка поставщика ЭТМ на факторинг';

export const warning = 'Отправить ответ на заявку можно только один раз';

export const formats = '.csv, .xls, .xlsx, .doc, .docx, .pdf, .jpg, .jpeg, .png, .zip, .rar, .7z, .txt';

export const acceptError = `Вы пытаетесь загрузить файл с недопустимым расширением, удалите его и загрузите файлы с расширением  ${formats}`;

export const uploadHint = `Загрузить файл в формате ${formats}`;

const fileFormatsForUploading = getFileFormatString(
  fileFormats.pdf,
  fileFormats.image,
  fileFormats.excel,
  fileFormats.csv,
  fileFormats.jpeg,
  fileFormats.xls,
  fileFormats.word,
  fileFormats.zip,
  fileFormats.rar,
  fileFormats.sevenZip,
  fileFormats.text,
);

export const factoringProps: IFieldsPropsState = {
  orgName: {
    label: 'Название организации поставщика',
    name: 'orgName',
  },
  orgInn: {
    label: 'ИНН организации поставщика',
    name: 'orgInn',
  },
  orgKpp: {
    label: 'КПП организации поставщика',
    name: 'orgKpp',
  },
  loginFio: {
    label: 'ФИО заявителя',
    name: 'loginFio',
  },
  files: {
    name: 'files',
    inputType: 'file',
    rules: [
      {
        validator: (_, values: FileType) => ruleForFileExtension(_, values, fileFormatsForUploading, acceptError),
      },
      {
        validator: (_, files) =>
          files.fileList.length
            ? Promise.resolve()
            : Promise.reject('Пожалуйста, вложите в ответ файл с коммерческим предложением для поставщика'),
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

export const resultProps: ResultProps = {
  status: 'success',
  title: 'Данные успешно отправлены',
};

export const completedProps: ResultProps = {
  status: 'warning',
  title: 'Выбранная заявка уже обработана',
};
