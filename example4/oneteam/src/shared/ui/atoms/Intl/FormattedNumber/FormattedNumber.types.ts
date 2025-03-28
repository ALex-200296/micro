import { JSXElementConstructor, ReactElement } from 'react';
import { FormatNumberOptions } from 'react-intl';

export interface IFormattedNumberProps extends FormatNumberOptions {
  value: number;
  children?(formattedNumber: string): ReactElement<any, string | JSXElementConstructor<any>>
}
