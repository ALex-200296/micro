import { IFormItemProps } from '@shared/ui';

import { StepKey } from '../../VendorContractForm.types';
import { GenerateContractKey } from '../GenerateContract.types';

import { IInformationEntityValues, InformationEntityKey } from './InformationEntity.types';

export const informationEntityFieldsProps: Record<keyof IInformationEntityValues, Omit<IFormItemProps, 'children'>> = {
  [InformationEntityKey.MANAGMENT]: {
    label: 'Форма правления',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.INFORMATION_ENTITY, InformationEntityKey.MANAGMENT],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [InformationEntityKey.ORG_NAME]: {
    label: 'Название юр.лица',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.INFORMATION_ENTITY, InformationEntityKey.ORG_NAME],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [InformationEntityKey.KPP]: {
    label: 'КПП',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.INFORMATION_ENTITY, InformationEntityKey.KPP],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [InformationEntityKey.INN]: {
    label: 'ИНН',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.INFORMATION_ENTITY, InformationEntityKey.INN],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [InformationEntityKey.OGRN]: {
    label: 'ОГРН',
    name: [StepKey.GENERATE_CONTRACT, GenerateContractKey.INFORMATION_ENTITY, InformationEntityKey.OGRN],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
};
