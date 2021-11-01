import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Form, Input, Button, Checkbox, message, notification } from 'antd';
import { FormProps } from 'antd/lib/form';
import { UserOutlined, LockOutlined, SmileOutlined } from '@ant-design/icons';

import { IStore } from '../../redux/interface';
import { setToken } from '../../redux/actions';

import logo from '../../assets/logo.svg';
import { login } from '../../api';
import './index.scss';

const { Item } = Form;
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
    openNotification();
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
  const openNotification = () => {
    const args = {
      message: 'Welcome To My Nest',
      description: (
        <span>
          This is a react-admin system. If you want to get more, place visite my{' '}
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/houfeii/react-ts-admin"
          >
            github.
          </a>
        </span>
      ),
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      duration: 60
    };
    notification.open(args);
  };

  return (
    <div className="login">
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
