import React, { useState } from 'react';
import { Layout } from 'antd';
import Interceptor from '../components/interceptor';
import Nav from './nav';
import Header from './header';
import Footer from './footer';
import Content from './content';
import './index.scss';

const Layouts = () => {
  const [collapsed, setcCllapsed] = useState<boolean>(false);

  const toggle = () => setcCllapsed(!collapsed);

  return (
    <Interceptor>
      <Layout>
        <Nav collapsed={collapsed} />
        <Layout
          className="site-layout"
          style={{
            paddingLeft: collapsed ? '80px' : '200px'
          }}
        >
          <Header collapsed={collapsed} toggle={toggle} />
          <Content />
          <Footer />
        </Layout>
      </Layout>
    </Interceptor>
  );
};

export default Layouts;
