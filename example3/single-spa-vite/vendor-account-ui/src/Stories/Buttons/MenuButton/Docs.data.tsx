import React from 'react';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { IconButtonProps } from '@shared/ui/molecules/Button/IconButton/IconButton.types';
import { MenuProps, Typography } from 'antd';

import { dataTestId } from '../../stories.data';

const { Link } = Typography;

export const propsToDisable = [
  'visible',
  'onVisibleChange',
  'overlay',
  'align',
  'prefixCls',
  'transitionName',
  'forceRender',
  'mouseEnterDelay',
  'mouseLeaveDelay',
  'openClassName',
];

export const buttonPropsConfig = `{
  buttonProps: IconButtonProps;
  dropdownIcon?: React.ReactNode;
}`;

export const menuPropsConfig = `{
  menu?: Omit<MenuButtonProps['menu'], 'items';
}`;

export const dropdownMenuItems: MenuProps['items'] = [
  {
    label: (
      <Link href='https://www.google.com/' target='_blank'>
        Google
      </Link>
    ),
    key: '1',
  },
  {
    label: (
      <Link href='https://ya.ru/' target='_blank'>
        Yandex
      </Link>
    ),
    key: '2',
  },
  {
    label: (
      <Link href='https://www.yahoo.com/' target='_blank'>
        Yahoo
      </Link>
    ),
    key: '3',
  },
];

export const defaultButtonPropsConfig: IconButtonProps = {
  icon: <VerticalAlignBottomOutlined />,
  children: 'text',
  dataTestId: `menubutton-${dataTestId}`,
};
