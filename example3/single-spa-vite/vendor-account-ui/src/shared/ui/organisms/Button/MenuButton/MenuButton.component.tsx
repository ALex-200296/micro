import React, { memo } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { IconButton } from '@shared/ui/molecules';
import { Dropdown, Space, Tooltip } from 'antd';

import { IMenuButtonProps } from './MenuButton.types';

export const MenuButton: React.FC<IMenuButtonProps> = ({
  buttonProps: { children, collapsed = false, ...btnProps },
  dropdownIcon = <DownOutlined />,
  ...props
}) => {
  return (
    <>
      {collapsed ? (
        <Tooltip title={children}>
          <Dropdown {...props}>
            <IconButton {...btnProps}>
              <Space>{dropdownIcon}</Space>
            </IconButton>
          </Dropdown>
        </Tooltip>
      ) : (
        <Dropdown {...props}>
          <IconButton {...btnProps}>
            <Space>
              {children}
              {dropdownIcon}
            </Space>
          </IconButton>
        </Dropdown>
      )}
    </>
  );
};

export default memo(MenuButton);
