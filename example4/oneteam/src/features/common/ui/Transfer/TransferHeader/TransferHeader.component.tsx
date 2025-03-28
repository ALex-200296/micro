import React, { useCallback, useReducer, useRef } from 'react';
import { DeleteOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons';
import { ITransferHeaderProps } from '@features/common/ui';
import { delay } from '@shared/lib';
import { IconButton } from '@shared/ui';
import { List, Popover, Space, Typography } from 'antd';
import cn from 'classnames';

import styles from './TransferHeader.module.scss';

const { Text } = Typography;

export const TransferHeader: React.FC<ITransferHeaderProps> = ({
  items,
  addElement,
  removeElement,
  selectElement,
  children,
  addButtonTitle,
  dropdownIcon = <DownOutlined />,
  itemTitle,
  activeBox,
}) => {
  const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);
  const listRef = useRef<HTMLDivElement | null>(null);

  const removeItem = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
      event.stopPropagation();
      removeElement(id);
    },
    [removeElement],
  );

  const handleAddElement = async () => {
    addElement();
    await delay(0);
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  return (
    <>
      <Popover
        open={isOpen}
        onOpenChange={toggleIsOpen}
        rootClassName={styles.popover}
        placement='bottomLeft'
        trigger='click'
        arrow={false}
        content={
          <>
            <div className={styles.content} ref={listRef}>
              <List
                split={false}
                itemLayout='horizontal'
                dataSource={items}
                renderItem={(id, idx) => (
                  <List.Item
                    key={id}
                    className={cn(styles.list_item_clickable, {
                      [styles.list_item_selected]: id === activeBox,
                    })}
                    onClick={() => {
                      selectElement(id);
                      toggleIsOpen();
                    }}
                  >
                    <List.Item.Meta
                      description={
                        <Text>
                          {itemTitle}
                          {idx + 1}
                        </Text>
                      }
                    />
                    {items.length > 1 && (
                      <IconButton
                        type='transparent'
                        icon={<DeleteOutlined />}
                        onClick={(event) => removeItem(event, id)}
                        dataTestId='remove-element'
                        className={styles.remove_button}
                      />
                    )}
                  </List.Item>
                )}
              />
            </div>
            <Space className={styles.add_button_space}>
              <IconButton
                onClick={handleAddElement}
                dataTestId='add-element'
                icon={<PlusOutlined />}
                className={styles.add_button}
              >
                {addButtonTitle}
              </IconButton>
            </Space>
          </>
        }
      >
        <Space className={styles.child_content}>
          {children}
          {dropdownIcon}
        </Space>
      </Popover>
    </>
  );
};
