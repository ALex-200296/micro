import React, { memo } from 'react';
import { CarryOutOutlined } from '@ant-design/icons';
import { useBreakpoints } from '@shared/lib';

import IconButton from '../../../molecules/Button/IconButton/IconButton.component';
import { IToolbarBtnProps } from '../Toolbar.types';

export const SubscribeToCalendar: React.FC<Omit<IToolbarBtnProps, 'drawerProps'>> = memo(
  ({ children = 'Подписаться на календарь', type = 'default', ...props }) => {
    const {
      breakpoints: { xl },
    } = useBreakpoints();
    return (
      <IconButton
        dataTestId='subscribe-to-calendar'
        {...props}
        icon={<CarryOutOutlined />}
        collapsed={type !== 'primary' && !xl}
      >
        {children}
      </IconButton>
    );
  },
);
