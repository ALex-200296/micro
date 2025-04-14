import { Layout, Menu, MenuProps } from "antd"
import { Content } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import { Link, Outlet } from "react-router-dom"
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number] & { link?: string };

const items: MenuItem[] = [
  {
    key: 'logistics',
    icon: <MailOutlined />,
    label: <Link to={'/'}/>,
    link: '/oneteam/logistics'
  },
  {
    key: 'calendar',
    icon: <MailOutlined />,
    label: 'Календарь',
    link: '/oneteam/calendar'
  },
];


export const App = (props: any) => {

  return <Layout>
    <Sider>
      <Menu theme="dark" items={items} />
    </Sider>
    <Content style={{ margin: '1rem' }}>
      <Outlet />
    </Content>
  </Layout>
}