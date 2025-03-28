import { isArray } from '@shared/lib';
import { StoreValue } from 'antd/es/form/interface';

import { IFormItemProps } from './FormItem.types';

export const sizeState = {
  mobile: {
    active: -0.438,
    default: 0.25,
  },
  small: {
    active: -0.563,
    default: 0.25,
  },
  middle: {
    active: -0.688,
    default: 0.25,
  },
  large: {
    active: -0.688,
    default: 0.5,
  },
};

export const filesConfig: Omit<IFormItemProps, 'children'> = {
  valuePropName: 'fileList',
  getValueFromEvent: (args: any): StoreValue => {
    if (isArray(args)) {
      return args;
    }
    return args?.fileList;
  },
};
