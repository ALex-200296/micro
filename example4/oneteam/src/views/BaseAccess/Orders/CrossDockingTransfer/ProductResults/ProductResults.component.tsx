import React, { memo } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Divider, Flex, List, Typography } from 'antd';

import { activeBoxName,getCountText } from '../CrossDockingTransfer.data';

import { IProductResultsProps } from './ProductResults.types';

import styles from './ProductResults.module.scss';

const { Title, Text } = Typography;

const ProductResults: React.FC<IProductResultsProps> = ({ productsData, boxes }) => (
  <Flex gap='small' vertical className={styles.container}>
    <Title level={5}>Итоги распределения</Title>
    <List
      dataSource={boxes}
      renderItem={(item, idx) => (
        <>
          <Flex justify='space-between' className={styles.item}>
            <Flex gap='small'>
              <InboxOutlined />
              <Text>
                {activeBoxName}
                {idx + 1}
              </Text>
            </Flex>
            <Text>{getCountText(productsData[item].length)}</Text>
          </Flex>
          <Divider className={styles.divider} />
        </>
      )}
    />
  </Flex>
);

export default memo(ProductResults);
