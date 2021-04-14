import React from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './index.scss';

interface IProps {
  collapsed: boolean;
  toggle: () => void;
}

class Header extends React.Component<IProps> {
  render() {
    const { collapsed, toggle } = this.props;
    return (
      <Layout.Header
        className="site-layout-background"
        style={{
          backgroundColor: 'white',
          overflow: 'auto',
          padding: 0,
          width: '100%'
        }}
      >
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
            onClick: toggle
          }
        )}
      </Layout.Header>
    );
  }
}

export default Header;
