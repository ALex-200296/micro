import { IFormItemProps } from '@shared/ui';

import { StepKey } from '../../VendorContractForm.types';
import { DiscountDefermentKey } from '../DiscountDeferment.types';

import { DefermentKey, IDefermentValues } from './Deferment.types';

export const defermentFieldsProps: Record<keyof IDefermentValues, Omit<IFormItemProps, 'children'>> = {
  [DefermentKey.deferment]: {
    label: 'Отсрочка платежа (45/90/120) банковских дней',
    name: [StepKey.discountDeferment, DiscountDefermentKey.defermentEntity, DefermentKey.deferment],
    rules: [
      { required: true, message: 'Пожалуйста, заполните обязательное поле' },
      {
        validator(_, value) {
          if (!Number.isInteger(value) || value < 0 || value > 999) {
            return Promise.reject('Может принимать только положительное целое значение до 999');
          }
          return Promise.resolve();
        },
      },
    ],
  },
};
