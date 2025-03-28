import React, { memo } from 'react';
import { Space } from 'antd';
import cn from 'classnames';

import { getVariantButton } from '../Editable.data';
import { IActionsConfig } from '../Editable.types';

import styles from './ActionRow.module.scss';

export const ActionRow: React.FC<Omit<IActionsConfig, 'position'>> = memo(
  ({ submitButtonProps, cancelButtonProps, className }) => {
    return (
      <Space className={cn(styles.space, className)}>
        {getVariantButton({ ...cancelButtonProps })}
        {getVariantButton({ ...submitButtonProps, type: 'primary' })}
      </Space>
    );
  },
);
