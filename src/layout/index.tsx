import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Layout, LayoutProps, message, Spin } from 'antd';

import { IStore, IUserInfo } from '../redux/interface';
import { setUserInfo, setAuths, setRoutes } from '../redux/actions';
import { formateDataTree } from '../utils/utils';
import { getInfo } from '../api';

import Nav from './nav';
import Header from './header';
import Footer from './footer';
import Content from './content';
import './index.scss';

type Props = {
  token: string;
  userInfo: IUserInfo;
  setUserInfo: (IUserInfo) => void;
  setAuths: (IAuths) => void;
  setRoutes: (IAuths) => void;
} & RouteComponentProps &
  LayoutProps;

const Layouts = (props: Props) => {
  const history = useHistory();
  const { token, userInfo, setUserInfo, setAuths, setRoutes } = props;
  const [spinning, setSpinning] = useState<boolean>(true);
  const [collapsed, setCllapsed] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      if (!userInfo) {
        getUserInfo();
      }
    } else {
      history.push('/login');
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const getUserInfo = async () => {
    const result = await getInfo(token);
    console.log('getUserInfo：', result);
    if (result.code === '20000') {
      const { userInfo, auths } = result.data;
      setUserInfo(userInfo);
      setAuths(auths);
      setRoutes(formateDataTree(auths));
      setSpinning(false);
    } else {
      message.error(result.message);
    }
  };

  const toggle = () => setCllapsed(!collapsed);

  return (
    <Spin spinning={spinning}>
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
    </Spin>
  );
};

export default connect(
  (state: IStore) => ({
    token: state.token,
    userInfo: state.userInfo
  }),
  { setUserInfo, setAuths, setRoutes }
)(Layouts);
