import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const Data = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
  theme="dark"
  mode="inline"
  defaultSelectedKeys={['1']}
  items={[
    {
      key: '1',
      icon: <UserOutlined />,
      label: <Link to="/admin">Admin</Link>,
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: <Link to="/techer">Techers</Link>,
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: <Link to="/uploads">Students</Link>,
    },
  ]}
/>

      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 580,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >

<Outlet/>
          
        </Content>
      </Layout>
    </Layout>
  );
};
export default Data;