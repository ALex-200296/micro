import React from 'react';
import { Button } from '@shared/ui/atoms/Button/Button.component';
import { Badge, Tag } from 'antd';

import { dataTestId } from '../stories.data';
export const collapseItems = [
  {
    label: 'Лейбл',
    subLabel: 'ПодЛейбл',
    key: '1',
    children: 'Контент',
    extra: <Tag>Экстра</Tag>,
  },
  {
    label: 'Лейбл',
    subLabel: 'ПодЛейбл',
    key: '2',
    children: 'Контент',
    extra: <Badge count={9} />,
  },
  {
    label: 'Лейбл',
    subLabel: 'ПодЛейбл',
    key: '3',
    children: 'Контент',
    extra: <Button dataTestId={`collapse-${dataTestId}`}>Экстра</Button>,
  },
];

export const collapsePropsToHide = ['children', 'prefixCls', 'activeKey'];

export const itemDetails = `{ id?: string;
  label?: string | React.ReactNode;
  subLabel?: string | React.ReactNode;
  headerClass?: string;
  showArrow?: boolean;
  className?: string;
  style?: object;
  destroyInactivePanel?: boolean;
  forceRender?: boolean;
  extra?: string | React.ReactNode;
  onItemClick?: (key: string | number) => void;
  key?: string | number;
  role?: string;
  collapsible?: CollapsibleType;
  children?: React.ReactNode;
  ref?: React.RefObject<HTMLDivElement>;
  }`;
