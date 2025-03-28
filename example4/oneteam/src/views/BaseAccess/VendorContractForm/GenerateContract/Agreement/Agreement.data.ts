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

export const hiddenNumberField = [RightToSignKey.charter];
export const visibleDateField = [RightToSignKey.powerOfAttorney];

export const agreementFieldsProps: Record<keyof IAgreementValues, Omit<IFormItemProps, 'children'>> = {
  [AgreementKey.fioSignatory]: {
    label: 'ФИО подписанта (в родительном падеже)',
    name: [StepKey.generateContract, GenerateContractKey.agreement, AgreementKey.fioSignatory],
    extra: 'Например: Иванова Ивана Ивановича',
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [AgreementKey.positionSignatory]: {
    label: 'Должность подписанта (в родительном падеже)',
    name: [StepKey.generateContract, GenerateContractKey.agreement, AgreementKey.positionSignatory],
    extra: 'Например: Руководителя отдела',
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [AgreementKey.fioProps]: {
    label: 'ФИО (для реквизитов)',
    name: [StepKey.generateContract, GenerateContractKey.agreement, AgreementKey.fioProps],
    extra: 'Например: Иванов И.И.',
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [AgreementKey.positionProps]: {
    label: 'Должность (для реквизитов)',
    name: [StepKey.generateContract, GenerateContractKey.agreement, AgreementKey.positionProps],
    extra: 'Например: Руководитель отдела',
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [AgreementKey.emailMerch]: {
    label: 'Email (для реквизитов)',
    name: [StepKey.generateContract, GenerateContractKey.agreement, AgreementKey.emailMerch],
    rules: [
      { required: true, message: 'Пожалуйста, заполните обязательное поле' },
      { type: 'email', message: 'Введен некорректный email' },
    ],
  },
  [AgreementKey.legalAddress]: {
    label: 'Юридический адрес',
    name: [StepKey.generateContract, GenerateContractKey.agreement, AgreementKey.legalAddress],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле', max: 200 }],
  },
  [AgreementKey.actualAddress]: {
    label: 'Фактический адрес',
    name: [StepKey.generateContract, GenerateContractKey.agreement, AgreementKey.actualAddress],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле', max: 200 }],
  },
  [AgreementKey.rightToSign]: {
    label: 'Право подписи на основании',
    name: [StepKey.generateContract, GenerateContractKey.agreement, AgreementKey.rightToSign],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [AgreementKey.number]: {
    label: 'Номер',
    name: [StepKey.generateContract, GenerateContractKey.agreement, AgreementKey.number],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [AgreementKey.date]: {
    label: 'Дата',
    name: [StepKey.generateContract, GenerateContractKey.agreement, AgreementKey.date],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [AgreementKey.checkbox]: {
    name: [StepKey.generateContract, GenerateContractKey.agreement, AgreementKey.checkbox],
    valuePropName: 'checked',
  },
};
