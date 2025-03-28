import React, { memo, NamedExoticComponent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseTabs } from '@shared/ui';
import { TabsProps } from 'antd';

import { getItems } from './Tabs.data';
import { IRoutedBaseTabsProps } from './Tabs.types';

const RoutedBaseTabs: React.FC<IRoutedBaseTabsProps> = memo(
  ({ routedTabs, initialTab, ...props }: IRoutedBaseTabsProps) => {
    const navigate = useNavigate();

    const onChange = useCallback((activeKey: string) => {
      const { path } = routedTabs.find(({ key }) => activeKey === key) || { path: null };
      if (path) navigate(`/${path}`);
    }, []);

    return <BaseTabs onChange={onChange} defaultActiveKey={initialTab} items={getItems(routedTabs)} {...props} />;
  },
);
RoutedBaseTabs.displayName = 'RoutedBaseTabs';

export const Tabs = memo(BaseTabs) as NamedExoticComponent<TabsProps> & {
  Routed: typeof RoutedBaseTabs;
};
Tabs.Routed = RoutedBaseTabs;
