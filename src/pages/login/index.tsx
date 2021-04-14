import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { RouteComponentProps } from 'react-router';
import { FormProps } from 'antd/lib/form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Particles from 'react-particles-js';
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
  setAlitaState: () => void;
  auth: string;
} & RouteComponentProps &
  FormProps;

const Login = (props: LoginProps) => {
  const { history } = props;
  const onFinish = async (values: ILogin) => {
    const result = await login(values);
    console.log('Received values of login: ', result);
    if (result.code === '20000') {
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
          initialValue="admin"
          rules={[{ required: true, message: 'Please input your Username~' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Item>
        <Item
          name="password"
          initialValue="admin"
          rules={[{ required: true, message: 'Please input your Password~' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
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

export default Login;
