import React, { memo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Routes } from '@app/routes/root.types';
import { useBreakpoints } from '@shared/lib';
import { IconButton, IconButtonProps } from '@shared/ui/molecules';

import { IToolbarBtnProps } from '../Toolbar.types';

export const AddGoods: React.FC<IToolbarBtnProps> = memo(
  ({ onClick, children = 'Добавить товары', type = 'primary', ...props }) => {
    const {
      breakpoints: { xl },
    } = useBreakpoints();
    const handleClick: IconButtonProps['onClick'] = (event) => {
      onClick?.(event);
      window.open(Routes.DOWNLOAD);
    };
    return (
      <IconButton
        dataTestId='add-goods'
        {...props}
        type={type}
        collapsed={type !== 'primary' && !xl}
        icon={<PlusOutlined />}
        onClick={handleClick}
      >
        {children}
      </IconButton>
    );
  },
);
