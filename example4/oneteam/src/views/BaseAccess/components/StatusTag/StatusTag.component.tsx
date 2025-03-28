import React from 'react';
import { IStatusTagProps } from '@views/BaseAccess/components/StatusTag/StatusTag.types';
import { Tag } from 'antd';
import cn from 'classnames';

import { tagStatusToColor } from './StatusTag.data';

import styles from './StatusTag.module.scss';

const StatusTag: React.FC<IStatusTagProps> = ({ status, statusCode }) => {
  return (
    <Tag color={tagStatusToColor[statusCode]}>
      <span className={cn({ [styles.tag_color]: statusCode === 'appoint' })}>{status}</span>
    </Tag>
  );
};

export default StatusTag;
