import React, { memo } from 'react';
import { TimePicker as TimePickerAntd } from 'antd';

import { shortTimeDottedFormat } from './TimePicker.data';
import { ITimePickerProps } from './TimePicker.types';

export const TimePicker: React.FC<ITimePickerProps> = memo(({ format = shortTimeDottedFormat, dataTestId, ...props }) => (
  <TimePickerAntd format={format} data-testid={`time-picker-${dataTestId}`} {...props} />
));