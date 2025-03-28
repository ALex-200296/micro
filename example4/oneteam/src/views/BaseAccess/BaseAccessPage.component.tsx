import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from '@entities/common/ui';
import { BaseLayout } from '@features/common/ui';

import styles from './BaseAccessPage.module.scss';

const BaseAccessPage: React.FC = () => (
  <BaseLayout menu={<Menu />} contentClassName={styles.content}>
    <Outlet />
  </BaseLayout>
);

export default memo(BaseAccessPage);
