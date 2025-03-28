import React, { memo } from 'react';
import { Typography } from 'antd';
import cn from 'classnames';

import { IBaseFileDownloadCellProps } from './TableCellsProps.types';

import styles from './TableCell.module.scss';

const { Link } = Typography;

export const FileDownloadCell: React.FC<IBaseFileDownloadCellProps> = memo(
  ({ entryData, onClick, href = '', addDownloadAttributes = false, disabled = false, className, title = '' }) => {
    return disabled ? (
      <div className={cn(className, styles.uploaded_file)}>{entryData}</div>
    ) : (
      <Link
        href={href}
        onClick={onClick}
        {...(addDownloadAttributes && { download: true, rel: 'noreferrer' })}
        className={styles.link}
        title={title}
      >
        <div className={cn(className, styles.uploaded_file)} title={title}>
          {entryData}
        </div>
      </Link>
    );
  },
);
