import React from 'react';
import { Layout } from 'antd';
import Nav from './nav';
import Header from './header';
import Footer from './footer';
import Content from './content';
import './index.scss';

class Layouts extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout>
        <Nav collapsed={collapsed} />
        <Layout
          className="site-layout"
          style={{
            paddingLeft: collapsed ? '80px' : '200px'
          }}
        >
          <Header collapsed={collapsed} toggle={this.toggle} />
          <Content />
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default Layouts;
