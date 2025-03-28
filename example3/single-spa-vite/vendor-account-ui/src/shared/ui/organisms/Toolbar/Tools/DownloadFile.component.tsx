import React, { memo } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useBreakpoints } from '@shared/lib';
import {Drawer} from '@shared/ui/atoms';

import IconButton from '../../../molecules/Button/IconButton/IconButton.component';
import { IToolbarBtnProps } from '../Toolbar.types';

export const DownloadFile: React.FC<IToolbarBtnProps> = memo(
  ({ children = 'Загрузить шаблон', drawerProps = false, type = 'primary', ...props }) => {
    const {
      breakpoints: { xl },
    } = useBreakpoints();
    return (
      <>
        <IconButton
          {...props}
          type={type}
          icon={<UploadOutlined />}
          collapsed={type !== 'primary' && !xl}
          dataTestId='download-file'
        >
          {children}
        </IconButton>
        {drawerProps && <Drawer {...drawerProps} />}
      </>
    );
  },
);
