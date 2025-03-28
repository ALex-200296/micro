import { IFormItemProps } from '@shared/ui';

import { StepKey } from '../VendorContractForm.types';

import { IPathwiseValues, PathwiseKey } from './Pathwise.types';

export const pathwiseFieldsProps: Record<keyof IPathwiseValues, Omit<IFormItemProps, 'children'>> = {
  [PathwiseKey.radio]: {
    name: [StepKey.pathwise, PathwiseKey.radio],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
};

export const radioData = [
  { value: 'Нет', label: 'У меня ещё нет договора, хочу перейти к заполнению данных для его генерации' },
  { value: 'Да', label: 'У меня уже есть договор, хочу перейти сразу к загрузке уставных документов' },
];
