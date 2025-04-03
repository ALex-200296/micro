import { Button, Col, Flex, Layout, Row, Space, Statistic, Table, Tag } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import Parcel from 'single-spa-react/parcel';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, Link } from 'react-router-dom';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

type MenuItem = Required<MenuProps>['items'][number] & { link?: string };

const items: MenuItem[] = [
  {
    key: 'logistics',
    icon: <MailOutlined />,
    label: 'Логистика',
    link: '/oneteam/logistics'
  },
  {
    key: 'calendar',
    icon: <MailOutlined />,
    label: 'Календарь',
    link: '/oneteam/calendar'
  },
];

export default function App(props) {
  return <Flex vertical gap='1rem'>
    <Layout>
      <Sider theme='dark'>
        <Parcel
          config={() => import('@org/sidebarParcel')}
          items={items}
          handleError={(err) => console.log(err)}
          parcelDidMount={() => console.log('React parcel mounted')}
        />
      </Sider>
      <Content style={{ margin: '1rem' }}>
        <Outlet />
      </Content>
    </Layout>
  </Flex>;
}