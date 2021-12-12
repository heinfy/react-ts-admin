import React, { useState, useEffect, useRef } from 'react';
import { JSEncrypt } from 'jsencrypt';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// 资源
import startIcon from '../../assets/images/audio_start.png';
import stopIcon from '../../assets/images/audio_stop.png';

import { register, getPublicKey } from '../../api/user';

import './index.scss';

const { Item } = Form;

const Register = () => {
  const audioRef: any = useRef(null);
  const [pubKey, setPulKey] = useState<string>('');
  const [play, setPlay] = useState<boolean>(false);
  useEffect(() => {
    getKey();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const change = () => {
    if (play) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!play);
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
  const onFinish = async (values: any) => {
    const password = encrypt(values.password);
    const res = await register({ ...values, password });
    if (res.code === 1) {
    } else {
      message.error(res.message);
    }
  };
  return (
    <div className="register">
      <Form
        colon={false}
        className="register-form"
        onFinish={onFinish}
        labelAlign="left"
      >
        <div className="title">注册账号</div>
        <Item
          style={{ width: 340 }}
          labelCol={{
            span: 6
          }}
          label="登录邮箱"
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
          style={{ width: 340 }}
          labelCol={{
            span: 6
          }}
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="请输入密码"
          />
        </Item>
        <Item
          style={{ width: 340 }}
          labelCol={{
            span: 6
          }}
          label="确定密码"
          name="password"
          rules={[{ required: true, message: '请再次输入密码' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="confirmPassword"
            placeholder="请再次输入密码"
          />
        </Item>
        <Item
          style={{ width: 340 }}
          labelCol={{
            span: 6
          }}
          label="手机号"
          name="phone"
          rules={[{ required: true, message: '请输入手机号' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="请输入手机号"
          />
        </Item>
        <Item
          style={{ width: 340 }}
          labelCol={{
            span: 6
          }}
        >
          <Button
            block
            size="large"
            style={{
              color: '#fff',
              letterSpacing: 2,
              backgroundColor: '#ffffff55'
            }}
            htmlType="submit"
          >
            注册
          </Button>
        </Item>
      </Form>
      <div className="control">
        <img
          className={play ? 'start' : 'stop'}
          onClick={change}
          src={play ? startIcon : stopIcon}
          alt={play ? 'start' : 'stop'}
        />
      </div>
      <audio
        loop
        ref={audioRef}
        preload="auto"
        className="audio_your_name"
        src="http://localhost:3000/upload/your_name.mp3"
      />
      <video
        className="video_your_name"
        autoPlay
        loop
        muted
        src="http://localhost:3000/upload/your_name.mp4"
      />
    </div>
  );
};

export default Register;
