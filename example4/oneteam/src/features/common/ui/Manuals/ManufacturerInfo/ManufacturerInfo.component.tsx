import React, { memo } from 'react';
import { userSelectors } from '@app/store/user/user.selectors';
import { Table } from '@shared/ui';
import { Typography } from 'antd';

import { manufacturerColumnsConfig } from './ManufacturerInfo.data';

import styles from '../Manuals.module.scss';

export const ManufacturerInfo: React.FC = memo(() => (
  <>
    <Typography.Title level={3}>Коды производителей</Typography.Title>
    <Table
      dataSelector={userSelectors.getManufacturerData}
      columns={manufacturerColumnsConfig}
      rowKey='code'
      className={styles.table}
    />
  </>
));
