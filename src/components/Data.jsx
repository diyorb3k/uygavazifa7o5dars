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
import { GiTeacher } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";


const { Header, Sider, Content } = Layout;

const Data = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const siderWidth = 200;
  const headerHeight = 64; 

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={siderWidth}
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          overflow: 'auto',
        }}
      >
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
              icon:<GiTeacher />,
              label: <Link to="/techer">Techers</Link>,
            },
            {
              key: '3',
              icon: <PiStudentBold />,
              label: <Link to="/uploads">Students</Link>,
            },
          ]}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : siderWidth }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: 'fixed',
            width: `calc(100% - ${collapsed ? 80 : siderWidth}px)`,
            zIndex: 1,
            top: 0, // Header qismiga top: 0 berildi
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
            marginTop: headerHeight,
            padding: 24,
            minHeight: 580,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto', // Outlet qismiga skroll berish
            height: `calc(100vh - ${headerHeight}px)`,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Data;
