import React from 'react';
import { IFormItemProps } from '@shared/ui';
import { FormInstance } from 'antd';

export type FiltersFormItemsType = Array<IFormItemProps> | React.ReactNode;

export interface IFiltersFormProps<T> {
  initialValues: T;
  formItems: FiltersFormItemsType;
  onReset?: () => void;
  onFinish?: (initialValues: T) => void;
  onValueChange?: (changeValue: Partial<T>, allValues: T) => void;
  className?: string;
  form?: FormInstance<T>;
}
