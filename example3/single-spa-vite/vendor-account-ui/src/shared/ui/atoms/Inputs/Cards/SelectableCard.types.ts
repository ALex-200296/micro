import React from 'react';
import { CheckboxProps } from 'antd';

export interface ICustomCardProps extends CheckboxProps {
  title: string;
  subtitle?: string;
  extra?: React.ReactNode;
  bottomnNode?: React.ReactNode;
}
