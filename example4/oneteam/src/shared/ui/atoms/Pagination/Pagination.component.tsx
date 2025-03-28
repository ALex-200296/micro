import React, { memo } from 'react';
import { Pagination as AntdPagination, PaginationProps } from 'antd';

import styles from './Pagination.module.scss';

export const Pagination: React.FC<PaginationProps> = memo(({ showSizeChanger = false, ...props }) => (
  <AntdPagination showSizeChanger={showSizeChanger} {...props} rootClassName={styles.pagination} />
));