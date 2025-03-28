import { IFormItemProps } from '@shared/ui';

import { OtherDirectionsKey } from '../OtherDirections.types';

export interface IFieldProps {
  [OtherDirectionsKey.supplierStartDate]: Omit<IFormItemProps, 'children'>;
}
