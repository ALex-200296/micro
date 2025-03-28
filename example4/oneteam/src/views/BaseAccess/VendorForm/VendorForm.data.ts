import React from 'react';
import { ResultProps } from 'antd';

import {
  commonInfoFieldsProps,
  contactInfoFieldsProps,
  contractPreviewFieldProps,
  organizationInfoFieldsProps,
} from './VendorFormSections/VendorFormSections.data';
import { IVendorHoldingState, IVendorInitialValues } from './VendorForm.types';

export const heading = 'Анкета поставщика';

const formatComment = (comment: string): string =>
  comment.replace(/(.{150})(\s|$)/g, (match, p1, p2) => (p2 === ' ' ? `${p1}\n` : p1.replace(/\s([^\s]*)$/, '\n$1')));

const formatArrayValues = (value: string[] | IVendorHoldingState[], name: string, label: React.ReactNode) => {
  switch (name) {
    case contactInfoFieldsProps.warehouses.name:
      return value.map((entry, index) => `${label}${index + 1}: ${entry};\n`).join('');
    case contactInfoFieldsProps.holdings.name:
      return (value as IVendorHoldingState[])
        .map(
          (entry) =>
            `${label}: ${entry.address}\n ${contactInfoFieldsProps.holdings.listFormItemProps?.hasContract.label}: ${
              entry.hasContract ? 'Да' : 'Нет'
            };\n`,
        )
        .join('');
    default:
      return `${label}: ${value.join(', ')};\n`;
  }
};
export const formatFormDataToFile = (values: Omit<IVendorInitialValues, 'files'>): string => {
  type entriesType = [keyof Omit<IVendorInitialValues, 'files'>, string | string[]];
  const entries = Object.entries<string | string[] | IVendorHoldingState[]>(values).filter(
    ([, value]) => !!value,
  ) as Array<entriesType>;
  const allFields = {
    ...commonInfoFieldsProps,
    ...contactInfoFieldsProps,
    ...organizationInfoFieldsProps,
    ...contractPreviewFieldProps,
  };
  const formDataString = entries
    .map(([key, value]) =>
      allFields[key]
        ? Array.isArray(value)
          ? formatArrayValues(value, key, allFields[key].label)
          : `${allFields[key].label ? allFields[key].label + ': ' : ''}${value};\n`
        : '',
    )
    .join('');
  return formatComment(formDataString);
};

export const resultProps: ResultProps = {
  status: 'success',
  title: 'Анкета успешно отправлена на согласование.',
  subTitle: 'Мы сообщим вам статус согласования после обработки анкеты.',
};

export const alertInfoMessage = 'Мы можем запросить документы для подтверждения указанной информации';

export const formFileName = 'Данные_формы_регистрации_нового_поставщика';

export const dataTestId = 'vendor-form';
