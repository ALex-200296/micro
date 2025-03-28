import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { List } from 'antd';

import { IconButton } from '../../Button/IconButton/IconButton.component';

import { PopoverContentProps } from './TagComponent.types';

import styles from './TagComponents.module.scss';

export const PopoverContent: React.FC<PopoverContentProps> = ({ hiddenValues }) => {
  return (
    <List
      className={styles.list}
      dataSource={hiddenValues}
      size='small'
      split={false}
      renderItem={(item) => (
        <List.Item
          className={styles.list_item}
          extra={
            item?.onClose ? (
              <IconButton
                collapsed
                icon={<CloseOutlined className={styles.icon} />}
                dataTestId='closeTagValue'
                type='transparent'
                onClick={item.onClose}
              />
            ) : null
          }
        >
          <span className={styles.list_item_value}>{item.value}</span>
        </List.Item>
      )}
    />
  );
};
