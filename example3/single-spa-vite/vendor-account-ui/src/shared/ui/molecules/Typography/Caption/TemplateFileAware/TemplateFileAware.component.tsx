import React, { memo } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';

import { ITemplateFileAwareProps } from './TemplateFileAware.types';

import styles from './TemplateFileAware.module.scss';
const { Text, Link } = Typography;

export const TemplateFileAware: React.FC<ITemplateFileAwareProps> = memo(({ description, path, name, className }) => {
  return (
    <Space className={className}>
      {description && (
        <Text className={styles.text} type='secondary'>
          <Text className={styles.description}>{description}</Text>
          <Link className={styles.link} href={path} download={name} target='_blank'>
            <DownloadOutlined className={styles.icon} />
            Скачать шаблон
          </Link>
        </Text>
      )}
    </Space>
  );
});