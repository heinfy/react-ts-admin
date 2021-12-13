import React, { useState, useEffect, useRef } from 'react';
import { JSEncrypt } from 'jsencrypt';
import { Form, Input, Button, message } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  InsuranceOutlined,
  SettingOutlined
} from '@ant-design/icons';

// 资源
import startIcon from '../../assets/images/audio_start.png';
import stopIcon from '../../assets/images/audio_stop.png';

import { register, getPublicKey } from '../../api/user';

import './index.scss';

const { Item } = Form;

const Register = () => {
  const [form] = Form.useForm();
  const audioRef: any = useRef(null);
  const [pubKey, setPulKey] = useState<string>('');
  const [play, setPlay] = useState<boolean>(false);
  useEffect(() => {
    getKey();
    form.setFieldsValue({
      email: 'abc@163.com',
      password: '003',
      confirmPassword: '003',
      phone: '13212341234',
      code: '766438'
    });
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
  const props = {
    style: { width: 320 },
    labelCol: {
      span: 6
    }
  };
  return (
    <div className="register">
      <Form
        form={form}
        colon={false}
        className="register-form"
        onFinish={onFinish}
        labelAlign="left"
      >
        <div className="title">注册账号</div>
        <Item
          {...props}
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
          {...props}
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
          {...props}
          label="确定密码"
          name="confirmPassword"
          rules={[{ required: true, message: '请再次输入密码' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="请再次输入密码"
          />
        </Item>
        <Item
          {...props}
          label="手机号"
          name="phone"
          rules={[
            {
              required: true,
              pattern: new RegExp(/^1[3-9]\d{9}$/, 'g'),
              message: '请填写正确的手机号'
            }
          ]}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="随便输入手机号"
            addonAfter={
              <Button type="text" size="small" style={{ padding: 0 }}>
                发送验证码
              </Button>
            }
          />
        </Item>
        <Item
          {...props}
          label="验证码"
          name="code"
          rules={[
            {
              required: true,
              pattern: new RegExp(/^d{6}$/, 'g'),
              message: '请填写正确的验证码'
            }
          ]}
        >
          <Input prefix={<InsuranceOutlined />} placeholder="随便6位数字即可" />
        </Item>
        <Item {...props}>
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
        src="http://localhost:8000/upload/your_name.mp3"
      />
      <video
        className="video_your_name"
        autoPlay
        loop
        muted
        src="http://localhost:8000/upload/your_name.mp4"
      />
    </div>
  );
};

export default Register;
