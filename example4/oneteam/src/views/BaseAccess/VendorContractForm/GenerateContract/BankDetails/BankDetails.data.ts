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
  [BankDetailsKey.bik]: {
    label: 'БИК',
    name: [StepKey.generateContract, GenerateContractKey.bankDetails, BankDetailsKey.bik],
    rules: [
      { required: true, message: 'Пожалуйста, заполните обязательное поле' },
      { len: 9, message: 'Неверный формат, БИК состоит из девяти цифр' },
    ],
    normalize: formatToIntegers,
  },
  [BankDetailsKey.nameBank]: {
    label: 'Наименование банка',
    name: [StepKey.generateContract, GenerateContractKey.bankDetails, BankDetailsKey.nameBank],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [BankDetailsKey.correspondentAccount]: {
    label: 'Корреспондентский счёт',
    name: [StepKey.generateContract, GenerateContractKey.bankDetails, BankDetailsKey.correspondentAccount],
    rules: [
      { required: true, message: 'Пожалуйста, заполните обязательное поле' },
      { len: 20, message: 'Неверный формат, кор.счёт состоит из двадцати цифр' },
    ],
    normalize: formatToIntegers,
  },
  [BankDetailsKey.currentAccount]: {
    label: 'Расчётный счёт',
    name: [StepKey.generateContract, GenerateContractKey.bankDetails, BankDetailsKey.currentAccount],
    rules: [
      { required: true, message: 'Пожалуйста, заполните обязательное поле' },
      { len: 25, message: 'Неверный формат, расчётный счёт состоит из двадцати цифр' },
    ],
    normalize: formatMaskCurrentAccount,
  },
};
