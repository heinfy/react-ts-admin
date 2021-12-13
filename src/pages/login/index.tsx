import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { JSEncrypt } from 'jsencrypt';

import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { IStore } from '../../redux/interface';
import { setToken } from '../../redux/actions';

import logo from '../../assets/logo.svg';
import { login, getPublicKey } from '../../api/user';

import { urlToObj } from '../../utils/utils';

import { LoginProps, ILogin } from './type';
import './index.scss';

const { Item } = Form;

const Login = (props: LoginProps) => {
  const history = useHistory();
  const location = useLocation();
  const { token, setToken } = props;
  const [pubKey, setPulKey] = useState<string>('');
  useEffect(() => {
    if (token) history.push('/');
    colourRibbon();
    getKey();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // canvas 背景
  const colourRibbon = () => {
    const c: any = document.getElementsByTagName('canvas')[0];
    const x: any = c.getContext('2d'),
      pr: number = window.devicePixelRatio || 1,
      w = window.innerWidth,
      h = window.innerHeight,
      f = 90,
      z = Math.random,
      u = Math.PI * 2,
      v = Math.cos;
    let r = 0,
      q;
    c.width = w * pr - 10;
    c.height = h * pr - 10;
    x.scale(pr, pr); // Synchronization with devicePixelRatio
    x.globalAlpha = 0.6; // gloabalAlpha set or return the opacity-value of draw

    function i() {
      x.clearRect(0, 0, w, h); // clear all rect
      q = [
        { x: 0, y: h * 0.7 + f },
        { x: 0, y: h * 0.7 - f }
      ];
      while (q[1].x < w + f) d(q[0], q[1]); // w + f
    }

    function d(i, j) {
      x.beginPath();
      x.moveTo(i.x, i.y);
      x.lineTo(j.x, j.y);
      const k = j.x + (z() * 2 - 0.25) * f,
        n = y(j.y);
      x.lineTo(k, n);
      x.closePath();
      r -= u / -50;
      x.fillStyle =
        '#' +
        (
          ((v(r) * 127 + 128) << 16) |
          ((v(r + u / 3) * 127 + 128) << 8) |
          (v(r + (u / 3) * 2) * 127 + 128)
        ).toString(16);
      x.fill();
      q[0] = q[1]; // old point -> new q[0]
      q[1] = { x: k, y: n }; // new point(k, n) -> new q[1]
    }
    function y(p) {
      const t = p + (z() * 2 - 1.1) * f;
      return t > h || t < 0 ? y(p) : t;
    }
    document.onclick = i;
    i();
  };
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
      setToken(res.result.token);
      const queryObject = location.search && urlToObj(location.search);
      history.push({
        pathname: queryObject.redirect || '/app/dashboard'
      });
    } else {
      message.error(res.message);
    }
  };

  return (
    <div className="login">
      <canvas></canvas>
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
          rules={[
            {
              required: true,
              type: 'email',
              message: '请输入您的登录邮箱'
            }
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="请输入登录邮箱" />
        </Item>
        <Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input
            prefix={<LockOutlined />}
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
          <a className="register_btn" href="/register">
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
