import React from 'react';
import { IButtonProps } from '@shared/ui';
import { ButtonProps as ButtonPropsAnt } from 'antd/es/button/button';

export interface IconButtonProps extends Omit<IButtonProps, 'type'> {
  icon: React.ReactNode;
  type?: ButtonPropsAnt['type'] | 'transparent';
  notification?: number;
  collapsed?: boolean;
  outline?: boolean;
}
