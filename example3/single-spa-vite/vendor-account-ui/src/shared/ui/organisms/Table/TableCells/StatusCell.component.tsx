import React, { memo } from 'react';
import { Badge } from 'antd';

import { getNumberStatusBadge } from './TableCell.data';
import { IStatusCellProps } from './TableCellsProps.types';

import styles from './TableCell.module.scss';

export const StatusCell: React.FC<IStatusCellProps> = memo(({ entryData, statusDesc, getStatus = getNumberStatusBadge }) => {
  const badgeProps = getStatus(entryData);
  return <Badge {...badgeProps} text={statusDesc} rootClassName={styles.status_cell} />;
});