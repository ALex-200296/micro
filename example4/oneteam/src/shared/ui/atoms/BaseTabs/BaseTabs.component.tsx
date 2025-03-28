import React, { memo } from 'react';
import { Tabs as TabsAntd, TabsProps as TabsPropsAntd } from 'antd';
import cn from 'classnames';

import styles from './Tabs.module.scss';

export const BaseTabs: React.FC<TabsPropsAntd> = memo(
  ({ destroyInactiveTabPane = true, className = 'margin_4_tabs', ...props }) => {
    return (
      <TabsAntd destroyInactiveTabPane={destroyInactiveTabPane} {...props} rootClassName={cn(styles.tabs, className)} />
    );
  },
);