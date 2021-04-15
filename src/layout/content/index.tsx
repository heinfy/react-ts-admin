import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import Admin from '../../pages/admin';

const Content = () => {
  return (
    <Layout.Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 600 }}
      >
        <Admin />
      </div>
    </Layout.Content>
  );
};

export default Content;
