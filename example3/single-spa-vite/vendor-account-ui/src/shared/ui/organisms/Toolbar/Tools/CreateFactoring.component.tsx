import React, { memo } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useBreakpoints } from '@shared/lib';
import { Drawer } from '@shared/ui/atoms';

import IconButton from '../../../molecules/Button/IconButton/IconButton.component';
import { IToolbarBtnProps } from '../Toolbar.types';

export const CreateFactoring: React.FC<IToolbarBtnProps> = memo(
  ({ children = 'Оставить заявку на факторинг', drawerProps = false, type = 'primary', ...props }) => {
    const {
      breakpoints: { xl },
    } = useBreakpoints();
    return (
      <>
        <IconButton
          dataTestId='create-factoring'
          {...props}
          type={type}
          icon={<UploadOutlined />}
          collapsed={type !== 'primary' && !xl}
        >
          {children}
        </IconButton>
        {drawerProps && <Drawer {...drawerProps} />}
      </>
    );
  },
);
