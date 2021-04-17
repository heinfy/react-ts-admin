import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Layout, LayoutProps, message, Spin } from 'antd';

import { IStore, IUserInfo, IAuths } from '../redux/interface';
import { setUserInfo, setAuths } from '../redux/actions';
import { getInfo } from '../api';
import { formateDataTree } from '../utils/utils';

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
} & RouteComponentProps &
  LayoutProps;

interface IRoutes {
  title: string;
  key: string;
  icon: string;
  id: number;
  pid: number;
  childen?: IRoutes;
}

const Layouts = (props: Props) => {
  const history = useHistory();
  const { token, userInfo, setUserInfo, setAuths } = props;
  const [spinning, setSpinning] = useState<boolean>(true);
  const [collapsed, setCllapsed] = useState<boolean>(false);
  const [routes, setRoutes] = useState<IRoutes[]>([]);

  useEffect(() => {
    if (token) {
      if (!userInfo) {
        getUserInfo();
      }
    } else {
      console.log(111);
      history.push('/login');
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const getUserInfo = async () => {
    const result = await getInfo(token);
    console.log('getUserInfo：', result);
    if (result.code === '20000') {
      setUserInfo(result.data.userInfo);
      setAuths(result.data.auths);
      const routes = formateDataTree(result.data.auths);
      setRoutes(routes);
      setSpinning(false);
    } else {
      message.error(result.message);
    }
  };

  const toggle = () => setCllapsed(!collapsed);

  return (
    <Spin spinning={spinning}>
      <Layout>
        <Nav collapsed={collapsed} routes={routes} />
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
  { setUserInfo, setAuths }
)(Layouts);
