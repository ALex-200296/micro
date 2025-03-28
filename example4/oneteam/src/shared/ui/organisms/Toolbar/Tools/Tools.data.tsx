import React from 'react';
import { NavLink } from 'react-router-dom';
import { RightCircleOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { catalogTabs } from '@app/routes/base/catalog/catalog.route';
import { MenuProps, Typography } from 'antd';

import { IconButtonProps } from '../../../molecules/Button/IconButton/IconButton.types';

const { Link } = Typography;

export const edoProviderMenu: MenuProps['items'] = [
  {
    label: (
      <Link href='https://kontur.ru/edi' target='_blank'>
        Заявка в Контур <RightCircleOutlined />
      </Link>
    ),
    key: '1',
  },
  {
    label: (
      <Link href='https://sbis.ru/help/edi/clients/network/etm_set' target='_blank'>
        Заявка в Тензор <RightCircleOutlined />
      </Link>
    ),
    key: '2',
  },
  {
    label: (
      <Link href='https://business.leradata.pro/' target='_blank'>
        Заявка в LeraData <RightCircleOutlined />
      </Link>
    ),
    key: '3',
  },
  {
    label: (
      <Link href='https://cislink.com/products/edi' target='_blank'>
        Заявка в CISLINK <RightCircleOutlined />
      </Link>
    ),
    key: '4',
  },
];

export const defaultEdoProviderButtonProps: IconButtonProps = {
  icon: <VerticalAlignBottomOutlined />,
  children: 'Подключение через провайдера',
  dataTestId: 'edo-provider',
};

export const getEditGoodsButtonMenu = () =>
  catalogTabs.map(({ key, label, path }) => ({
    label: (
      <NavLink to={path} target='_blank'>
        {label}
      </NavLink>
    ),
    key,
  }));
