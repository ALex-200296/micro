import React, { memo } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { useBreakpoints } from '@shared/lib';
import { IconButton } from '@shared/ui/molecules';

import { IToolbarBtnProps } from '../Toolbar.types';

export const DownloadUnpublishedGoods: React.FC<IToolbarBtnProps> = ({
  children = 'Скачать список',
  type = 'default',
  ...props
}) => {
  const {
    breakpoints: { xl },
  } = useBreakpoints();
  return (
    <IconButton
      {...props}
      icon={<DownloadOutlined />}
      dataTestId='download-unpublished-goods'
      collapsed={type !== 'primary' && !xl}
    >
      {children}
    </IconButton>
  );
};

export default memo(DownloadUnpublishedGoods);
