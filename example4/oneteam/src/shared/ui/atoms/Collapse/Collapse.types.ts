import React from 'react';
import { CollapseProps as AntdCollapseProps } from 'antd';

interface IExtraCollapseProps {
  subLabel?: string | React.ReactNode;
}
export interface ICollapseProps extends Omit<AntdCollapseProps, 'items' | 'activeKey'> {
  items: Array<NonNullable<AntdCollapseProps['items']>[number] & IExtraCollapseProps>;
}
