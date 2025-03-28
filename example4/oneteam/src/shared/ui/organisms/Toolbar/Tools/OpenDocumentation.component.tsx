import React, { memo } from 'react';
import { FolderOpenOutlined } from '@ant-design/icons';
import { useBreakpoints } from '@shared/lib';
import { Drawer } from '@shared/ui/atoms';

import IconButton from '../../../molecules/Button/IconButton/IconButton.component';
import { IToolbarBtnProps } from '../Toolbar.types';

export const OpenDocumentation: React.FC<IToolbarBtnProps> = memo(
  ({ children = 'Документация', drawerProps = false, type = 'default', ...props }) => {
    const {
      breakpoints: { xl },
    } = useBreakpoints();
    return (
      <>
        <IconButton
          {...props}
          icon={<FolderOpenOutlined />}
          collapsed={type !== 'primary' && !xl}
          dataTestId='open-documentation'
        >
          {children}
        </IconButton>
        {drawerProps && <Drawer {...drawerProps} />}
      </>
    );
  },
);
