import React, { memo } from 'react';
import { DatePicker as DatePickerAntd } from 'antd';
import cn from 'classnames';

import { dottedFormat } from './DatePicker.formats';
import { IDatePickerProps } from './DatePicker.types';

import styles from './DatePicker.module.scss';

export const DatePicker: React.FC<IDatePickerProps> = ({
  format = dottedFormat,
  className,
  placeholder = '',
  dataTestId,
  ...props
}) => (
  <DatePickerAntd
    format={format}
    placeholder={placeholder}
    className={cn(styles.date_picker, className)}
    data-testid={`date-picker-${dataTestId}`}
    {...props}
  />
);

export default memo(DatePicker);
