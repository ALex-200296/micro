import React, { memo } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useBreakpoints } from '@shared/lib';

import IconButton from '../../../molecules/Button/IconButton/IconButton.component';
import { IToolbarBtnProps } from '../Toolbar.types';

export const EdoApplication: React.FC<Omit<IToolbarBtnProps, 'drawerProps'> & { edoType?: string }> = memo(
  ({ children = 'Оставить заявку', type = 'primary', edoType = 'ЮЗЭДО', target = '_blank', ...props }) => {
    const {
      breakpoints: { xl },
    } = useBreakpoints();
    return (
      <IconButton
        dataTestId='edo-application'
        {...props}
        icon={<UploadOutlined />}
        type={type}
        target={target}
        collapsed={type !== 'primary' && !xl}
      >
        {children} {edoType}
      </IconButton>
    );
  },
);
