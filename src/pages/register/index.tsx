import React, { useState, useEffect, useRef } from 'react';
import { JSEncrypt } from 'jsencrypt';
import { Form, Input, Button, Statistic, message, notification } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  InsuranceOutlined,
  ContactsOutlined
} from '@ant-design/icons';

// 资源
import startIcon from '../../assets/images/audio_start.png';
import stopIcon from '../../assets/images/audio_stop.png';

import { register, getPublicKey } from '../../api/user';

import './index.scss';

const { Item } = Form;
const { Countdown } = Statistic;

const Register = () => {
  const [form] = Form.useForm();
  const audioRef: any = useRef(null);
  const [pubKey, setPulKey] = useState<string>('');
  const [play, setPlay] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);
  useEffect(() => {
    getKey();
    form.setFieldsValue({
      email: 'abc123@163.com',
      username: 'Danny123',
      password: '003Houfei.12',
      confirmPassword: '003Houfei.12',
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
  const openNotificationWithIcon = () => {
    notification.success({
      message: '注册成功',
      description: (
        <>
          <div>这里使用定时器来代替注册，</div>
          <div>一般用户账号： base@qq.com，</div>
          <div>管理员用户：admin@qq.com，</div>
          <div>密码都是 003。</div>
        </>
      )
    });
  };
  const onFinish = async (values: any) => {
    if (!!values) {
      // 模拟注册
      setTimeout(() => {
        openNotificationWithIcon();
        message.success('success');
        form.resetFields();
      }, 2000);
    } else {
      const { username, email } = values;
      const password = encrypt(values.password);
      const res = await register({ username, email, password });
      if (res.code === 1) {
        message.success(res.message);
        form.resetFields();
      } else {
        message.error(res.message);
      }
    }
  };
  const props = {
    style: { width: 320 },
    labelCol: {
      span: 6
    }
  };
  // 发送验证码
  const sendCode = () => {
    if (isSend) return;
    setIsSend(true);
  };
  // 倒计时
  const deadline = Date.now() + 1000 * 60;
  // 倒计时结束
  const onCountdownFinish = () => {
    setIsSend(false);
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
          <Input prefix={<ContactsOutlined />} placeholder="请输入登录邮箱" />
        </Item>
        <Item
          {...props}
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名'
            },
            {
              pattern: new RegExp(/^[A-z][A-z0-9_]{1,}$/, 'g'),
              message: '用户名必须以字母开头，由字母、数字、下划线组成'
            },
            {
              pattern: new RegExp(/^.{6,14}$/, 'g'),
              message: '用户名必须6到16位'
            }
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
        </Item>
        <Item
          {...props}
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码'
            },
            {
              pattern: new RegExp(
                /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[~!@#$%^&*\.]).*$/,
                'g'
              ),
              message: '密码至少6位，包含大写字母、小写字母、数字以及特殊字符'
            }
          ]}
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
          rules={[
            {
              required: true,
              message: '请再次输入密码'
            },
            {
              pattern: new RegExp(
                /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[~!@#$%^&*\.]).*$/,
                'g'
              ),
              message: '密码至少6位，包含大写小写数字特殊字符'
            },
            {
              validator: (_: any, value: string) => {
                const pwd = form.getFieldValue('password');
                console.log('pwd', pwd);
                if (pwd !== value) {
                  return Promise.reject('俩次输入的密码不同');
                } else {
                  return Promise.resolve();
                }
              }
            }
          ]}
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
              isSend ? (
                <>
                  <Countdown
                    value={deadline}
                    format="ss"
                    onFinish={onCountdownFinish}
                  />
                  s后重发
                </>
              ) : (
                <Button
                  type="text"
                  size="small"
                  onClick={sendCode}
                  style={{ padding: 0 }}
                >
                  发送验证码
                </Button>
              )
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
              pattern: new RegExp(/^\d{6}$/, 'g'),
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
