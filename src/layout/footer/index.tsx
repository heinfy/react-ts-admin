import React from 'react';
import { Layout } from 'antd';

const Footer = () => {
  return (
    <Layout.Footer style={{ textAlign: 'center' }}>
      <div>Ant Design ©{new Date().getFullYear()} Created by Ant UED</div>
    </Layout.Footer>
  );
};

export default Footer;
