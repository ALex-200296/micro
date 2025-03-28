import { IFormItemProps } from '@shared/ui';

import { StepKey } from '../../VendorContractForm.types';
import { GenerateContractKey } from '../GenerateContract.types';

import { AgreementKey, IAgreementValues, RightToSignKey } from './Agreement.types';

export const textAreaProps = {
  maxLength: 200,
  autoSize: {
    minRows: 3,
    maxRows: 3,
  },
};

export const hiddenNumberField = [RightToSignKey.CHARTER];
export const visibleDateField = [RightToSignKey.POWER_OF_ATTORNEY];

export const agreementFieldsProps: Record<keyof IAgreementValues, Omit<IFormItemProps, 'children'>> = {
  [AgreementKey.FIO_SAGNATORY]: {
    label: 'ФИО подписанта (в родительном падеже)',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.AGREEMENT, AgreementKey.FIO_SAGNATORY],
    extra: 'Например: Иванова Ивана Ивановича',
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [AgreementKey.PISITION_SIGNATORY]: {
    label: 'Должность подписанта (в родительном падеже)',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.AGREEMENT, AgreementKey.PISITION_SIGNATORY],
    extra: 'Например: Руководителя отдела',
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [AgreementKey.FIO_PROPS]: {
    label: 'ФИО (для реквизитов)',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.AGREEMENT, AgreementKey.FIO_PROPS],
    extra: 'Например: Иванов И.И.',
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [AgreementKey.POSITION_PROPS]: {
    label: 'Должность (для реквизитов)',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.AGREEMENT, AgreementKey.POSITION_PROPS],
    extra: 'Например: Руководитель отдела',
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [AgreementKey.EMAIL_MERCH]: {
    label: 'Email (для реквизитов)',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.AGREEMENT, AgreementKey.EMAIL_MERCH],
    rules: [
      { required: true, message: 'Пожалуйста, заполните обязательное поле' },
      { type: 'email', message: 'Введен некорректный email' },
    ],
  },
  [AgreementKey.LEGAL_ADDRESS]: {
    label: 'Юридический адрес',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.AGREEMENT, AgreementKey.LEGAL_ADDRESS],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле', max: 200 }],
  },
  [AgreementKey.ACTUAL_ADDRESS]: {
    label: 'Фактический адрес',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.AGREEMENT, AgreementKey.ACTUAL_ADDRESS],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле', max: 200 }],
  },
  [AgreementKey.RIGHT_TO_SIGN]: {
    label: 'Право подписи на основании',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.AGREEMENT, AgreementKey.RIGHT_TO_SIGN],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [AgreementKey.NUMBER]: {
    label: 'Номер',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.AGREEMENT, AgreementKey.NUMBER],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [AgreementKey.DATE]: {
    label: 'Дата',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.AGREEMENT, AgreementKey.DATE],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [AgreementKey.CHECKBOX]: {
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.AGREEMENT, AgreementKey.CHECKBOX],
    valuePropName: 'checked',
  },
};
