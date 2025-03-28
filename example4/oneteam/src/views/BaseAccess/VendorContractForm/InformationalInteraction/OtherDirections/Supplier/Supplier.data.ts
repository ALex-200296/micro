import { StepKey } from '../../../VendorContractForm.types';
import { InformationalInteractionKey } from '../../InformationalInteraction.types';
import { OtherDirectionsKey } from '../OtherDirections.types';

import { IFieldProps } from './Supplier.types';

export const fieldsProps: IFieldProps = {
  [OtherDirectionsKey.supplierStartDate]: {
    label: 'Срок начала размещения информации через "Инфресурс"',
    name: [
      StepKey.informationalInteraction,
      InformationalInteractionKey.otherDirections,
      OtherDirectionsKey.supplierStartDate,
    ],
    rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
  },
};
