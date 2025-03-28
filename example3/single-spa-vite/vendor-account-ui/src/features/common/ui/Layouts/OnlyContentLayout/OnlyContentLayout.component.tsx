import React, { memo, Suspense } from 'react';
import { Layout } from '@shared/ui/atoms';
import { Layout as LayoutAntd, Spin } from 'antd';

import styles from './OnlyContentLayout.module.scss';

export interface IBaseLayoutProps {
  children: React.ReactNode;
  contentClassName?: string;
}

const { Content } = LayoutAntd;

export const OnlyContentLayout: React.FC<IBaseLayoutProps> = ({ children, contentClassName }) => {
  return (
    <Layout className={styles.position_center}>
      <Suspense fallback={<Spin />}>
        <Content className={contentClassName}>{children}</Content>
      </Suspense>
    </Layout>
  );
};

export default memo(OnlyContentLayout);
