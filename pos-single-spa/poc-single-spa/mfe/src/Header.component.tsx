import { Menu as AntMenu, Layout } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const { Header } = Layout

const menu = [
  {
    label: <Link to={`/infres`}>Инфресурс</Link>,
    key: 'infres',

  },
  {
    label: <Link to={`/oneteam`}>OneTeam</Link>,
    key: 'oneteam',
  },
  {
    label: <Link to={`/vite`}>Vite</Link>,
    key: 'vite',
  },
]

export default function Root(props) {
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState([])
  const selectedKeys = useMemo(() => pathname.split('/').filter((value) => !!value), [pathname]);

  const onOpenChange = useCallback((openKeys: string[]) => {
    setOpenKeys(openKeys);
  }, []);

  return <>
    <Header style={{ marginBottom: '1rem' }}>
      <AntMenu selectedKeys={selectedKeys} openKeys={openKeys} onOpenChange={onOpenChange} theme="dark" mode="horizontal" items={menu} />
    </Header>
  </>
}
