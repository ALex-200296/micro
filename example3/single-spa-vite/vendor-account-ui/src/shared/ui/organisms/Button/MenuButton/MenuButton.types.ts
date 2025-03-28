import React from 'react';
import { IconButtonProps } from '@shared/ui/molecules';
import { DropdownProps } from 'antd';


export interface IMenuButtonProps extends DropdownProps {
  buttonProps: IconButtonProps;
  dropdownIcon?: React.ReactNode;
}
