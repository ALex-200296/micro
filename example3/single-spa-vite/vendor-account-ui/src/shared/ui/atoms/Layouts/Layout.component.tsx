import React, { memo } from 'react';
import { Layout as LayoutAntd } from 'antd';

import styles from './Layout.module.scss';

export interface ILayoutProps {
  className?: string;
  children?: React.ReactNode;
}

export const Layout: React.FC<ILayoutProps> = memo(({ children }) => (
  <LayoutAntd className={styles.layout}>{children}</LayoutAntd>
));
