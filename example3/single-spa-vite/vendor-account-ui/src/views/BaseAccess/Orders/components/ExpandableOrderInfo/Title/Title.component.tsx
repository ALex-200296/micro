import React, { memo, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, IconButton } from '@shared/ui';
import { Flex, Popover, Typography } from 'antd';

import { ExpandableTitlePropsType } from '../ExpandableOrderInfo.types';

import styles from './Title.module.scss';

const { Text } = Typography;

const Title: React.FC<ExpandableTitlePropsType> = ({
  consignee: { name, address, inn, kpp, polGln },
  volume,
  weight,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const onOpenChange = (open: boolean) => {
    setVisible(open);
  };

  return (
    <Flex align='center' justify='space-between' className={styles.flex}>
      <Flex align='center'>
        <Text>Грузополучатель:</Text>
        <Popover
          placement='right'
          trigger='click'
          open={visible}
          title={
            <Flex justify='space-between' align='center'>
              {name}
              <IconButton
                onClick={() => onOpenChange(false)}
                type='transparent'
                dataTestId='close-icon'
                icon={<CloseOutlined />}
                className={styles.close_icon}
              />
            </Flex>
          }
          onOpenChange={onOpenChange}
          content={
            <Flex vertical className={styles.flex_content}>
              {!!address && <Text className={styles.text}>Адрес: {address}</Text>}
              {!!inn && !!kpp && (
                <Text className={styles.text}>
                  ИНН/КПП: {inn}/{kpp}
                </Text>
              )}
              {!!polGln && <Text className={styles.text}>GLN/ILN: {polGln} </Text>}
            </Flex>
          }
        >
          <Button dataTestId='consignee-link' type='link' className={styles.consignee_link}>
            {name}
          </Button>
        </Popover>
      </Flex>
      <Flex align='center' gap='middle'>
        {!!volume && <Text>Объём: {volume}m3</Text>}
        {!!weight && <Text>Масса: {weight}кг</Text>}
      </Flex>
    </Flex>
  );
};

export default memo(Title);
