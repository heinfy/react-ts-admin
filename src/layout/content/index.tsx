import React from 'react';
import { Layout } from 'antd';
import BreadcrumbMap from '../../components/BreadcrumbMap';
import Admin from '../../pages/admin';

const Content = () => {
  return (
    <Layout.Content style={{ margin: '0 16px' }}>
      <BreadcrumbMap></BreadcrumbMap>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 'calc(100vh - 190px)' }}
      >
        <Admin />
      </div>
    </Layout.Content>
  );
};

export default Content;
