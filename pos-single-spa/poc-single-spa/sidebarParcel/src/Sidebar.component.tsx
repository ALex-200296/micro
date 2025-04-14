import { Menu } from "antd";
import { useCallback, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const getItems = (items) => items.map(({ link, label, ...props }) => ({ label: link ? <Link to={link}>{label}</Link> : label, ...props }))

export default function Sidebar(props) {
  const { pathname } = useLocation();
  const selectedKeys = useMemo(() => pathname.split('/').filter((value) => !!value), [pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const onOpenChange = useCallback((openKeys: string[]) => {
    setOpenKeys(openKeys);
  }, []);
  console.log(selectedKeys, openKeys)
  return (<Menu
    selectedKeys={selectedKeys}
    onOpenChange={onOpenChange}
    openKeys={openKeys}
    mode="inline"
    theme="dark"
    style={{ height: '100%' }}
    items={getItems(props.items)}
  />)
}