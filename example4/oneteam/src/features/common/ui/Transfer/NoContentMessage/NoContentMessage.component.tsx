import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';

import { INoContentMessageProps } from './NoContentMessage.types';

import styles from './NoContentMessage.module.scss';

const { Text } = Typography;

export const NoContentMessage: React.FC<INoContentMessageProps> = ({ children }) => (
  <Flex vertical align='center' gap='small'>
    <InboxOutlined className={styles.no_content_icon} />
    <Text className={styles.empty_message_text}>{children}</Text>
  </Flex>
);
