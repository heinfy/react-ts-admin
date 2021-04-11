import React from 'react';
import { Layout, Menu } from 'antd';
import {
  VideoCameraOutlined,
  UploadOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import './index.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface IProps {
  collapsed: boolean;
}

class Nav extends React.Component<IProps> {
  render() {
    const { collapsed } = this.props;
    return (
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}
        breakpoint="lg"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="5" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="13" icon={<UserOutlined />}>
              Tom
            </Menu.Item>
            <Menu.Item key="14" icon={<UserOutlined />}>
              Bill
            </Menu.Item>
            <Menu.Item key="15" icon={<UserOutlined />}>
              Bill
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
            <Menu.Item key="10">Team 2</Menu.Item>
            <Menu.Item key="11">Team 2</Menu.Item>
            <Menu.Item key="12">Team 2</Menu.Item>
            <Menu.Item key="13">Team 2</Menu.Item>
            <Menu.Item key="14">Team 2</Menu.Item>
            <Menu.Item key="15">Team 2</Menu.Item>
            <Menu.Item key="16">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Nav;
