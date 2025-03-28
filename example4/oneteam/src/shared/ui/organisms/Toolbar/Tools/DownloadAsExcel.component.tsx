import React, { memo } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { useBreakpoints } from '@shared/lib';

import IconButton from '../../../molecules/Button/IconButton/IconButton.component';
import { IToolbarBtnProps } from '../Toolbar.types';

export const DownloadAsExcel: React.FC<Omit<IToolbarBtnProps, 'drawerProps'>> = memo(
  ({ children = 'Выгрузить в Excel', type = 'default', ...props }) => {
    const {
      breakpoints: { xl },
    } = useBreakpoints();
    return (
      <IconButton
        dataTestId='download-as-excel'
        {...props}
        icon={<DownloadOutlined />}
        collapsed={type !== 'primary' && !xl}
      >
        {children}
      </IconButton>
    );
  },
);
