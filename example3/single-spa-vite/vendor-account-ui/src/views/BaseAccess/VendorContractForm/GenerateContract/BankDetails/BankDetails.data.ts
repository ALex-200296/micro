import { IFormItemProps } from '@shared/ui';
import { valueType } from 'antd/lib/statistic/utils';

import { StepKey } from '../../VendorContractForm.types';
import { GenerateContractKey } from '../GenerateContract.types';

import { BankDetailsKey, IBankDetailsValues } from './BankDetails.types';

const OnlyIntegersRegEx = /[^\d]/g;
const itemsForSpacesInMask = [2, 4, 7, 8, 12];

const formatToIntegers = (val?: valueType): string =>
  val
    ? val
        .toString()
        .split('')
        .map((char) => (!OnlyIntegersRegEx.test(char) ? char : ''))
        .join('')
    : '';

const formatMaskCurrentAccount = (val?: valueType): string => {
  if (val) {
    const arrayOfChars: Array<string> = formatToIntegers(val).split('');
    return arrayOfChars
      .map((char, index) =>
        itemsForSpacesInMask.includes(index) && index !== arrayOfChars.length - 1 ? char + ' ' : char,
      )
      .join('');
  }
  return '';
};

export const bankDetailsFieldsProps: Record<keyof IBankDetailsValues, Omit<IFormItemProps, 'children'>> = {
  [BankDetailsKey.BIK]: {
    label: 'БИК',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.BANK_DETAILS, BankDetailsKey.BIK],
    rules: [
      { required: true, message: 'Пожалуйста, заполните обязательное поле' },
      { len: 9, message: 'Неверный формат, БИК состоит из девяти цифр' },
    ],
    normalize: formatToIntegers,
  },
  [BankDetailsKey.NAME_BANK]: {
    label: 'Наименование банка',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.BANK_DETAILS, BankDetailsKey.NAME_BANK],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [BankDetailsKey.CORRESPONDENT_ACCOUNT]: {
    label: 'Корреспондентский счёт',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.BANK_DETAILS, BankDetailsKey.CORRESPONDENT_ACCOUNT],
    rules: [
      { required: true, message: 'Пожалуйста, заполните обязательное поле' },
      { len: 20, message: 'Неверный формат, кор.счёт состоит из двадцати цифр' },
    ],
    normalize: formatToIntegers,
  },
  [BankDetailsKey.CURRENT_ACCOUNT]: {
    label: 'Расчётный счёт',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.BANK_DETAILS, BankDetailsKey.CURRENT_ACCOUNT],
    rules: [
      { required: true, message: 'Пожалуйста, заполните обязательное поле' },
      { len: 25, message: 'Неверный формат, расчётный счёт состоит из двадцати цифр' },
    ],
    normalize: formatMaskCurrentAccount,
  },
};
