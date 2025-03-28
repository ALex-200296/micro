import { IFormItemProps } from '@shared/ui';

import { OtherDirectionsKey } from '../OtherDirections.types';

export interface IFieldProps {
  [OtherDirectionsKey.SUPPLIER_START_DATE]: Omit<IFormItemProps, 'children'>;
}
