import React, { memo } from 'react';
import { Space, Typography } from 'antd';

import { IEventsReportFormInfoProps } from './EventsReportForm.types';

import styles from './EventsReportForm.module.scss';

const { Text, Link } = Typography;

const EventsReportFormInfo: React.FC<IEventsReportFormInfoProps> = ({ fileName, fileText, helperText }) => {
  return fileName ? (
    <Text className={styles.file_text}>
      {fileText}
      <Link href={fileName} target='_blank' download className={styles.file_link}>
        тут
      </Link>
    </Text>
  ) : (
    <Space>{helperText}</Space>
  );
};

export default memo(EventsReportFormInfo);
