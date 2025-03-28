import React, { memo } from 'react';
import { FileAddOutlined } from '@ant-design/icons';
import { useBreakpoints } from '@shared/lib/hooks';
import {Drawer} from '@shared/ui/atoms';

import IconButton from '../../../molecules/Button/IconButton/IconButton.component';
import { IToolbarBtnProps } from '../Toolbar.types';

export const CreateAct: React.FC<IToolbarBtnProps> = memo(
  ({ children = 'Сформировать акт сверки', drawerProps = false, type = 'primary', ...props }) => {
    const {
      breakpoints: { xl },
    } = useBreakpoints();
    return (
      <>
        <IconButton
          dataTestId='create-act'
          {...props}
          type={type}
          icon={<FileAddOutlined />}
          collapsed={type !== 'primary' && !xl}
        >
          {children}
        </IconButton>
        {drawerProps && <Drawer {...drawerProps} />}
      </>
    );
  },
);
