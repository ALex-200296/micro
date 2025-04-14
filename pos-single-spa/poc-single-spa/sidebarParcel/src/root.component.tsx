import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar.component'

export default function Root(props) {
  return ( 
    <BrowserRouter>
      <Sidebar {...props}/>
    </BrowserRouter>

  )
}
