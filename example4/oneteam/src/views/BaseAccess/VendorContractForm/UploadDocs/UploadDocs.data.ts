import { fileFormats, getFileFormatString, IFileInputProps } from '@features/common/ui';
import { FileType, ruleForFileExtension, ruleForFileSize } from '@shared/lib';
import { IFormItemProps } from '@shared/ui';

import { StepKey } from '../VendorContractForm.types';

export const dataTestId = 'vendor-contract-form';

export const VendorContractUploadKeys = {
  contract: 'contract',
  regulations: 'regulations',
  protocol: 'protocol',
  tradeMark: 'tradeMark',
  powerOfAttorney: 'powerOfAttorney',
  declaration: 'declaration',
  extraDocs: 'extraDocs',
} as const;

const uploadFormItemProps: Record<
  (typeof VendorContractUploadKeys)[keyof typeof VendorContractUploadKeys],
  Omit<IFormItemProps, 'children'>
> = {
  [VendorContractUploadKeys.contract]: {
    required: true,
    rules: [
      {
        required: true,
        message: 'Пожалуйста, загрузите обязательный документ',
        validator: (_, { fileList }: FileType) => (fileList.length ? Promise.resolve() : Promise.reject()),
      },
      {
        validator: (_, values: FileType) =>
          ruleForFileExtension(
            _,
            values,
            fileFormats.pdf,
            `Вы пытаетесь загрузить файл с недопустимым расширением, удалите его и загрузите файлы с расширением ${fileFormats.pdf}`,
          ),
      },
      {
        validator: (_, value: FileType) => ruleForFileSize(_, value),
      },
    ],
    name: [StepKey.uploadingDocuments, VendorContractUploadKeys.contract],
    id: VendorContractUploadKeys.contract,
    inputType: 'file',
  },
  [VendorContractUploadKeys.regulations]: {
    inputType: 'file',
    required: true,
    rules: [
      {
        required: true,
        message: 'Пожалуйста, загрузите обязательный документ',
        validator: (_, { fileList }: FileType) => (fileList.length ? Promise.resolve() : Promise.reject()),
      },
      {
        validator: (_, values: FileType) =>
          ruleForFileExtension(
            _,
            values,
            getFileFormatString(fileFormats.image, fileFormats.jpeg, fileFormats.pdf),
            `Вы пытаетесь загрузить файл с недопустимым расширением, удалите его и загрузите файлы с расширением ${getFileFormatString(
              fileFormats.image,
              fileFormats.jpeg,
              fileFormats.pdf,
            )}`,
          ),
      },
      {
        validator: (_, value: FileType) => ruleForFileSize(_, value),
      },
    ],
    name: [StepKey.uploadingDocuments, VendorContractUploadKeys.regulations],
    id: VendorContractUploadKeys.regulations,
  },
  [VendorContractUploadKeys.protocol]: {
    inputType: 'file',
    required: true,
    rules: [
      {
        required: true,
        message: 'Пожалуйста, загрузите обязательный документ',
        validator: (_, { fileList }: FileType) => (fileList.length ? Promise.resolve() : Promise.reject()),
      },
      {
        validator: (_, values: FileType) =>
          ruleForFileExtension(
            _,
            values,
            getFileFormatString(fileFormats.image, fileFormats.jpeg, fileFormats.pdf),
            `Вы пытаетесь загрузить файл с недопустимым расширением, удалите его и загрузите файлы с расширением ${getFileFormatString(
              fileFormats.image,
              fileFormats.jpeg,
              fileFormats.pdf,
            )}`,
          ),
      },
      {
        validator: (_, value: FileType) => ruleForFileSize(_, value),
      },
    ],
    name: [StepKey.uploadingDocuments, VendorContractUploadKeys.protocol],
    id: VendorContractUploadKeys.protocol,
  },
  [VendorContractUploadKeys.tradeMark]: {
    inputType: 'file',
    required: true,
    rules: [
      {
        required: true,
        message: 'Пожалуйста, загрузите обязательный документ',
        validator: (_, { fileList }: FileType) => (fileList.length ? Promise.resolve() : Promise.reject()),
      },
      {
        validator: (_, values: FileType) =>
          ruleForFileExtension(
            _,
            values,
            getFileFormatString(fileFormats.image, fileFormats.jpeg, fileFormats.pdf),
            `Вы пытаетесь загрузить файл с недопустимым расширением, удалите его и загрузите файлы с расширением ${getFileFormatString(
              fileFormats.image,
              fileFormats.jpeg,
              fileFormats.pdf,
            )}`,
          ),
      },
      {
        validator: (_, value: FileType) => ruleForFileSize(_, value),
      },
    ],
    name: [StepKey.uploadingDocuments, VendorContractUploadKeys.tradeMark],
    id: VendorContractUploadKeys.tradeMark,
  },
  [VendorContractUploadKeys.powerOfAttorney]: {
    inputType: 'file',
    rules: [
      {
        validator: (_, values: FileType) =>
          ruleForFileExtension(
            _,
            values,
            getFileFormatString(fileFormats.image, fileFormats.jpeg, fileFormats.pdf),
            `Вы пытаетесь загрузить файл с недопустимым расширением, удалите его и загрузите файлы с расширением ${getFileFormatString(
              fileFormats.image,
              fileFormats.jpeg,
              fileFormats.pdf,
            )}`,
          ),
      },
      {
        validator: (_, value: FileType) => ruleForFileSize(_, value),
      },
    ],
    name: [StepKey.uploadingDocuments, VendorContractUploadKeys.powerOfAttorney],
    id: VendorContractUploadKeys.powerOfAttorney,
  },
  [VendorContractUploadKeys.declaration]: {
    inputType: 'file',
    rules: [
      {
        validator: (_, values: FileType) =>
          ruleForFileExtension(
            _,
            values,
            getFileFormatString(fileFormats.image, fileFormats.jpeg, fileFormats.pdf),
            `Вы пытаетесь загрузить файл с недопустимым расширением, удалите его и загрузите файлы с расширением ${getFileFormatString(
              fileFormats.image,
              fileFormats.jpeg,
              fileFormats.pdf,
            )}`,
          ),
      },
      {
        validator: (_, value: FileType) => ruleForFileSize(_, value),
      },
    ],
    name: [StepKey.uploadingDocuments, VendorContractUploadKeys.declaration],
    id: VendorContractUploadKeys.declaration,
  },
  [VendorContractUploadKeys.extraDocs]: {
    inputType: 'file',
    rules: [
      {
        validator: (_, values: FileType) =>
          ruleForFileExtension(
            _,
            values,
            getFileFormatString(fileFormats.image, fileFormats.jpeg, fileFormats.pdf, fileFormats.word),
            `Вы пытаетесь загрузить файл с недопустимым расширением, удалите его и загрузите файлы с расширением ${getFileFormatString(
              fileFormats.image,
              fileFormats.jpeg,
              fileFormats.pdf,
              fileFormats.word,
            )}`,
          ),
      },
      {
        validator: (_, value: FileType) => ruleForFileSize(_, value),
      },
    ],
    name: [StepKey.uploadingDocuments, VendorContractUploadKeys.extraDocs],
    id: VendorContractUploadKeys.extraDocs,
  },
};
const uploadTips = {
  [VendorContractUploadKeys.contract]: {
    name: 'Договор',
    tip: 'Мы сгенерировали договор из данных, которые вы нам предоставили. Скачайте и ознакомьтесь с готовым договором. Если вы согласны с ним, поставьте подписи на каждой странице, полностью отсканируйте договор и загрузите в формате pdf',
  },
  [VendorContractUploadKeys.regulations]: {
    name: 'Устав',
    tip: 'Загрузите устав организации в формате pdf, jpg, jpeg или png. В нем должны быть все страницы с подписью и печатью в конце документа',
  },
  [VendorContractUploadKeys.protocol]: {
    name: 'Протокол/решение о назначении генерального директора',
    tip: 'Загрузите актуальный протокол/решение о назначении генерального директора в формате pdf, jpg, jpeg или png',
  },
  [VendorContractUploadKeys.tradeMark]: {
    name: 'Документы на товарный знак',
    tip: 'Приложите документы для каждого бренда (свидетельство на товарный знак, разрешение правообладателя на использование товарного знака, сертификат дилера или отказное письмо) в формате pdf, jpg, jpeg или png',
  },
  [VendorContractUploadKeys.powerOfAttorney]: {
    name: 'Копия доверенности',
    tip: 'Если договор подписывает лицо, не являющееся руководителем организации, приложите доверенность на право подписи договоров и иных документов, указанных в Договоре в формате pdf, jpg, jpeg или png',
  },
  [VendorContractUploadKeys.declaration]: {
    name: 'Декларация по УСН',
    tip: 'Если вы работаете по УСН, приложите декларацию за последний отчетный период с отметкой налоговой в формате pdf, jpg, jpeg или png',
  },
  [VendorContractUploadKeys.extraDocs]: {
    name: 'Дополнительные документы',
    tip: 'Если у вас есть дополнительные документы, которые вы хотите приложить к договору, прикрепите их сюда в формате png, jpg, jpeg, doc, docx, pdf',
  },
};

const uploadFileInputProps: Record<
  (typeof VendorContractUploadKeys)[keyof typeof VendorContractUploadKeys],
  IFileInputProps
> = {
  [VendorContractUploadKeys.contract]: {
    accept: getFileFormatString(fileFormats.pdf),
    uploadHint: `Загрузите файл в формате ${fileFormats.pdf}`,
    dataTestId: `contract-${dataTestId}`,
  },
  [VendorContractUploadKeys.regulations]: {
    accept: getFileFormatString(fileFormats.image, fileFormats.jpeg, fileFormats.pdf),
    uploadHint: `Загрузите файл в формате ${getFileFormatString(fileFormats.image, fileFormats.jpeg, fileFormats.pdf)}`,
    dataTestId: `regulations-${dataTestId}`,
  },
  [VendorContractUploadKeys.protocol]: {
    accept: getFileFormatString(fileFormats.image, fileFormats.jpeg, fileFormats.pdf),
    uploadHint: `Загрузите файл в формате ${getFileFormatString(fileFormats.image, fileFormats.jpeg, fileFormats.pdf)}`,
    dataTestId: `protocol-${dataTestId}`,
  },
  [VendorContractUploadKeys.tradeMark]: {
    accept: getFileFormatString(fileFormats.image, fileFormats.jpeg, fileFormats.pdf),
    uploadHint: `Загрузите файлы в формате ${getFileFormatString(
      fileFormats.image,
      fileFormats.jpeg,
      fileFormats.pdf,
    )}`,
    multiple: true,
    dataTestId: `trade-mark-${dataTestId}`,
  },
  [VendorContractUploadKeys.powerOfAttorney]: {
    accept: getFileFormatString(fileFormats.image, fileFormats.jpeg, fileFormats.pdf),
    uploadHint: `Загрузите файл в формате ${getFileFormatString(fileFormats.image, fileFormats.jpeg, fileFormats.pdf)}`,
    dataTestId: `power-of-attorney-${dataTestId}`,
  },
  [VendorContractUploadKeys.declaration]: {
    accept: getFileFormatString(fileFormats.image, fileFormats.jpeg, fileFormats.pdf),
    uploadHint: `Загрузите файл в формате ${getFileFormatString(fileFormats.image, fileFormats.jpeg, fileFormats.pdf)}`,
    dataTestId: `declaration-${dataTestId}`,
  },
  [VendorContractUploadKeys.extraDocs]: {
    accept: getFileFormatString(fileFormats.image, fileFormats.jpeg, fileFormats.pdf, fileFormats.word),
    uploadHint: `Загрузите файлы в формате ${getFileFormatString(
      fileFormats.image,
      fileFormats.jpeg,
      fileFormats.pdf,
      fileFormats.word,
    )}`,
    multiple: true,
    dataTestId: `extra-docs-${dataTestId}`,
  },
};

export const uploadSignDocText = 'Загрузите подписанный и отсканированный договор в формате pdf';

export const uploadDocsContent = Object.values<
  (typeof VendorContractUploadKeys)[keyof typeof VendorContractUploadKeys]
>(VendorContractUploadKeys).map((value) => ({
  formItem: uploadFormItemProps[value],
  tips: uploadTips[value],
  fileInput: uploadFileInputProps[value],
}));

export const uploadDocsInitialValues = Object.fromEntries(
  Object.values(VendorContractUploadKeys).map((value) => [
    value,
    {
      file: null,
      fileList: [],
    },
  ]),
) as unknown as Record<(typeof VendorContractUploadKeys)[keyof typeof VendorContractUploadKeys], FileType>;
