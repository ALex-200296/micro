import { IFormItemProps } from '@shared/ui';

import { StepKey } from '../../VendorContractForm.types';
import { GenerateContractKey } from '../GenerateContract.types';

import { IInformationEntityValues, InformationEntityKey } from './InformationEntity.types';

export const informationEntityFieldsProps: Record<keyof IInformationEntityValues, Omit<IFormItemProps, 'children'>> = {
  [InformationEntityKey.managment]: {
    label: 'Форма правления',
    name: [StepKey.generateContract, GenerateContractKey.informationEntity, InformationEntityKey.managment],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [InformationEntityKey.orgName]: {
    label: 'Название юр.лица',
    name: [StepKey.generateContract, GenerateContractKey.informationEntity, InformationEntityKey.orgName],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [InformationEntityKey.kpp]: {
    label: 'КПП',
    name: [StepKey.generateContract, GenerateContractKey.informationEntity, InformationEntityKey.kpp],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [InformationEntityKey.inn]: {
    label: 'ИНН',
    name: [StepKey.generateContract, GenerateContractKey.informationEntity, InformationEntityKey.inn],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
  [InformationEntityKey.ogrn]: {
    label: 'ОГРН',
    name: [StepKey.generateContract, GenerateContractKey.informationEntity, InformationEntityKey.ogrn],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
};
