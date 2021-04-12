import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Particles from 'react-particles-js';
import particlesConfig from '../../json/particlesConfig.json';
import logo from '../../assets/logo.svg';
import './index.scss';

interface ILogin {
  username: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const onFinish = (values: ILogin) => {
    console.log('Received values of form: ', values);
  };
  const { Item } = Form;
  /* eslint-disable */
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
            placeholder="Username"
          />
        </Item>
        <Item
          name="password"
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
