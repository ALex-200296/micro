import React from 'react';
import { FormItemProps as AntdFormItemProps } from 'antd';
export interface IFormItemProps extends Omit<AntdFormItemProps, 'colon'> {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  labelType?: 'default' | 'float';
  inputType?: 'default' | 'file';
}
