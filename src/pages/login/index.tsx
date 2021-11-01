import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { JSEncrypt } from 'jsencrypt';

import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { IStore } from '../../redux/interface';
import { setToken } from '../../redux/actions';

import logo from '../../assets/logo.svg';
import { login, getPublicKey } from '../../api';

import { LoginProps, ILogin } from './type';
import './index.scss';

const { Item } = Form;

const Login = (props: LoginProps) => {
  const history = useHistory();
  const { token, setToken } = props;
  const [pubKey, setPulKey] = useState<string>('');
  useEffect(() => {
    if (token) history.push('/');
    getKey();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getKey = async () => {
    const res = await getPublicKey();
    if (res.code === 1) {
      setPulKey(res.result);
    } else {
      message.error(res.message);
    }
  };
  const encrypt = (data) => {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(pubKey);
    return encryptor.encrypt(data);
  };
  const onFinish = async (values: ILogin) => {
    const password = encrypt(values.password);
    const res = await login({ ...values, password });
    if (res.code === 1) {
      console.log('object', res);
      setToken(res.token);
      // history.push('/');
    } else {
      message.error(res.message);
    }
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
          name="email"
          rules={[{ required: true, message: 'Please input your Username~' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入登录邮箱"
          />
        </Item>
        <Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password~' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码"
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
