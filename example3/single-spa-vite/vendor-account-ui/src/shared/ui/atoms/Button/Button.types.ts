import React from 'react';
import { ButtonProps as ButtonPropsAnt, TooltipProps } from 'antd';

export interface IButtonProps extends Omit<ButtonPropsAnt, 'ghost' | 'primary' | 'type' | 'rootClassName'> {
  dataTestId: string;
  type?: ButtonPropsAnt['type'] | 'transparent';
  children?: React.ReactNode;
  tooltipProps?: Omit<TooltipProps, 'children'>;
}
