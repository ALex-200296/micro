import React, { memo } from 'react';
import { userSelectors } from '@app/store/user/user.selectors';
import { Table } from '@shared/ui';

import { accessTableConfig } from './AccessTable.data';

import styles from '../AccountControl.module.scss';

const AccessTable: React.FC = () => (
  <Table className={styles.table} columns={accessTableConfig} dataSelector={userSelectors.getUsersLkp} rowKey='id' />
);

export default memo(AccessTable);
