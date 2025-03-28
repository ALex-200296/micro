import React, { memo } from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import { useBreakpoints } from '@shared/lib';
import { Drawer } from '@shared/ui/atoms';

import IconButton from '../../../molecules/Button/IconButton/IconButton.component';
import { IToolbarBtnProps } from '../Toolbar.types';

export const CreateTask: React.FC<IToolbarBtnProps> = memo(
  ({ children = 'Создать встречу', type = 'primary', drawerProps = false, ...props }) => {
    const {
      breakpoints: { xl },
    } = useBreakpoints();
    return (
      <>
        <IconButton
          dataTestId='create-task'
          {...props}
          type={type}
          icon={<CalendarOutlined />}
          collapsed={type !== 'primary' && !xl}
        >
          {children}
        </IconButton>
        {drawerProps && <Drawer {...drawerProps} />}
      </>
    );
  },
);
