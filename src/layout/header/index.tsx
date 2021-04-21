import React from 'react';
import { Layout, Menu, Badge } from 'antd';
import screenfull from 'screenfull';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  NotificationOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  SettingOutlined
} from '@ant-design/icons';
import MyCenter from '../../components/MyCenter';
import './index.scss';

const { SubMenu } = Menu;
interface IProps {
  collapsed: boolean;
  toggle: () => void;
}

interface IState {
  isFullscreen: boolean;
}

class Header extends React.Component<IProps, IState> {
  state = {
    isFullscreen: false
  };
  handleClick = (e) => {
    console.log('click ', e);
    if (e.key === 'screenfull') {
      if (screenfull.isEnabled) {
        const { isFullscreen } = this.state;
        this.setState({
          isFullscreen: !isFullscreen
        });
        screenfull.toggle();
      }
    }
  };
  render() {
    const { collapsed, toggle } = this.props;
    const { isFullscreen } = this.state;
    return (
      <Layout.Header
        style={{
          backgroundColor: 'white',
          height: '66px',
          padding: '0',
          overflow: 'auto',
          width: '100%',
          boxSizing: 'border-box'
        }}
        className="site-layout-header"
      >
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
            onClick: toggle
          }
        )}
        <div className="header-userinfo">
          <Menu onClick={this.handleClick} mode="horizontal">
            <Menu.Item
              key="screenfull"
              icon={
                isFullscreen ? (
                  <FullscreenExitOutlined />
                ) : (
                  <FullscreenOutlined />
                )
              }
            >
              全屏
            </Menu.Item>
            <Menu.Item key="messgae" icon={<NotificationOutlined />}>
              <Badge dot>
                <span
                  style={{
                    marginRight: '6px'
                  }}
                >
                  消息
                </span>
              </Badge>
            </Menu.Item>
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="系统">
              <Menu.ItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="my-center">
              <MyCenter></MyCenter>
            </Menu.Item>
          </Menu>
        </div>
      </Layout.Header>
    );
  }
}

export default Header;
