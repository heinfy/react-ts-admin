import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Form, Input, Button, Checkbox, message } from 'antd';
import { FormProps } from 'antd/lib/form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Particles from 'react-particles-js';

import { IStore } from '../../redux/interface';
import { setToken } from '../../redux/actions';

import particlesConfig from '../../json/particlesConfig.json';
import logo from '../../assets/logo.svg';
import { login } from '../../api';
import './index.scss';

interface ILogin {
  username: string;
  password: string;
  remember: boolean;
}

type LoginProps = {
  token: string;
  setToken: (string) => void;
} & RouteComponentProps &
  FormProps;

const Login = (props: LoginProps) => {
  const history = useHistory();
  const { token, setToken } = props;

  useEffect(() => {
    if (token) history.push('/');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onFinish = async (values: ILogin) => {
    const result = await login(values);
    console.log('Received values of login: ', result);
    if (result.code === '20000') {
      setToken(result.data.token);
      history.push('/');
    } else {
      message.error(result.message);
    }
  };
  const { Item } = Form;
  // eslint-disable-next-line
  const config: any = particlesConfig;
  return (
    <div className="login">
      <Particles className="particles" params={config} />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <div className="title">
          <img className="title__logo" src={logo} alt="logo" />
          <h5>React Admin 后台系统</h5>
        </div>
        <Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username~' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名为admin或guest"
          />
        </Item>
        <Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password~' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码随便填！"
          />
        </Item>
        <Item>
          <Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住账号</Checkbox>
          </Item>
          <a className="login-form-forgot" href="/forget">
            忘记密码
          </a>
        </Item>

        <Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登陆
          </Button>
          <a className="register" href="/register">
            没有账号？去注册！
          </a>
        </Item>
      </Form>
    </div>
  );
};

export default connect(
  (state: IStore) => ({
    token: state.token
  }),
  {
    setToken
  }
)(Login);
