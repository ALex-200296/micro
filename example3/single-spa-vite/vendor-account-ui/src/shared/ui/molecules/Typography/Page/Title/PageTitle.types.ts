import React from 'react';
import { TitleProps } from 'antd/es/typography/Title';

export interface IPageTitleProps extends Pick<TitleProps, 'onClick' | 'type'> {
  heading: string;
  className?: string;
  subHeading?: React.ReactNode;
}
