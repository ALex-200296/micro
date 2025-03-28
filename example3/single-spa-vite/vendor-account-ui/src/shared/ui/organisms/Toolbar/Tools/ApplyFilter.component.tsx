import React, { memo } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { useBreakpoints } from '@shared/lib';
import { Drawer } from '@shared/ui/atoms';

import IconButton from '../../../molecules/Button/IconButton/IconButton.component';
import { IToolbarBtnProps } from '../Toolbar.types';

export const ApplyFilter: React.FC<IToolbarBtnProps> = memo(
  ({ children = 'Фильтр', drawerProps = false, type = 'default', ...props }) => {
    const {
      breakpoints: { xl },
    } = useBreakpoints();
    return (
      <>
        <IconButton
          {...props}
          icon={<FilterOutlined />}
          collapsed={type !== 'primary' && !xl}
          dataTestId='apply-filter'
        >
          {children}
        </IconButton>
        {drawerProps && <Drawer {...drawerProps} />}
      </>
    );
  },
);
