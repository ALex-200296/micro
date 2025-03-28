import React, { memo } from 'react';
import { Button } from '@shared/ui';
import { Badge, Tooltip } from 'antd';
import cn from 'classnames';

import { IconButtonProps } from './IconButton.types';

import styles from './IconButton.module.scss';
import theme from '@styles/themeExports.module.scss';

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  notification,
  type = 'default',
  collapsed = false,
  ...props
}) => {
  const renderBadge = (notification: number) => {
    return (
      <Badge
        size='small'
        count={notification}
        color={props.disabled ? theme.textTertiary : undefined}
        className={cn(styles.badge)}
        rootClassName={cn(styles.badge_override, { [styles[`${type}_badge`]]: !props.disabled })}
        title=''
      />
    );
  };

  return (
    <>
      {collapsed ? (
        <Tooltip title={children}>
          <Button type={type} {...props}>
            {!!notification && renderBadge(notification)}
          </Button>
        </Tooltip>
      ) : (
        <Button type={type} {...props}>
          {children}
          {!!notification && renderBadge(notification)}
        </Button>
      )}
    </>
  );
};

export default memo(IconButton);
