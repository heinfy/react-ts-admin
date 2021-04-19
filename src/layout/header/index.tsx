import React from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import MyCenter from '../../components/MyCenter';
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
        style={{
          backgroundColor: 'white',
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
          <MyCenter></MyCenter>
        </div>
      </Layout.Header>
    );
  }
}

export default Header;
