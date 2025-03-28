import { StepKey } from '../../../VendorContractForm.types';
import { InformationalInteractionKey } from '../../InformationalInteraction.types';
import { OtherDirectionsKey } from '../OtherDirections.types';

import { IFieldProps } from './Supplier.types';

export const fieldsProps: IFieldProps = {
  [OtherDirectionsKey.SUPPLIER_START_DATE]: {
    label: 'Срок начала размещения информации через "Инфресурс"',
    name: [
      StepKey.INFORMATIONAL_INTERACTION,
      InformationalInteractionKey.OTHER_DIRECTIONS,
      OtherDirectionsKey.SUPPLIER_START_DATE,
    ],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
};
