import React, { memo } from 'react';
import { FormattedNumber as IntlFormattedNumber } from 'react-intl';

import { IFormattedNumberProps } from './FormattedNumber.types';

export const FormattedNumber: React.FC<IFormattedNumberProps> = memo(({ value, ...props }) => {
  return <IntlFormattedNumber value={value} {...props} />;
});
