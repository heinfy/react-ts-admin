import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LayoutProps, message, Spin } from 'antd';

import { IStore, IUserInfo, IAuths } from '../../redux/interface';
import { setUserInfo, setAuths } from '../../redux/actions';
import { getInfo } from '../../api';

type Props = {
  token: string;
  userInfo: IUserInfo;
  auths: IAuths[];
  setUserInfo: (IUserInfo) => void;
  setAuths: (IAuths) => void;
} & RouteComponentProps &
  LayoutProps;

const Interceptor = (props: Props) => {
  const history = useHistory();
  const { token, userInfo, setUserInfo, setAuths, children } = props;
  const [spinning, setSpinning] = useState<boolean>(true);

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
      setUserInfo(result.data.userInfo);
      setAuths(result.data.auths);
      setSpinning(false);
    } else {
      message.error(result.message);
    }
  };
  return <Spin spinning={spinning}>{children}</Spin>;
};

export default connect(
  (state: IStore) => ({
    token: state.token,
    userInfo: state.userInfo,
    auths: state.auths
  }),
  { setUserInfo, setAuths }
)(Interceptor);
