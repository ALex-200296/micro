import React, { memo } from 'react';
import { Dropdown, DropdownProps, Typography } from 'antd';

const { Link } = Typography;

import styles from './OrderCell.module.scss';

const OperationCell: React.FC<DropdownProps> = (props) => {
  return (
    <Dropdown {...props}>
      <Link className={styles.operation_cell}>Действия</Link>
    </Dropdown>
  );
};

export default memo(OperationCell);
