import React, { memo } from 'react';
import { UndoOutlined } from '@ant-design/icons';
import { IconButton } from '@shared/ui';
import { Flex, Typography } from 'antd';

import { ICrossDockingHeader } from './CrossDockingHeader.types';

import styles from './CrossDockingHeader.module.scss';

const { Title } = Typography;

const CrossDockingHeader: React.FC<ICrossDockingHeader> = ({ title, onReset }) => (
  <Flex justify='space-between' className={styles.flex}>
    <Title level={5}>{title}</Title>
    <IconButton dataTestId='reset-button' icon={<UndoOutlined />} onClick={onReset}>
      Сбросить распределение
    </IconButton>
  </Flex>
);

export default memo(CrossDockingHeader);
