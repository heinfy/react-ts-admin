import React, { useEffect } from 'react';
import { Form, Input, Modal, message } from 'antd';

import { operateUser } from '../api/user';

import { IUserInfo } from '../redux/interface';

type IProps = {
  visible: boolean;
  setUserInfo: (IUserInfo) => void;
  setVisible: (visible: boolean) => void;
  userInfo: IUserInfo;
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
};

const { Item } = Form;

const UserInfoModel = (props: IProps) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [userInfoForm] = Form.useForm();
  const { visible, userInfo, setUserInfo, setVisible } = props;
  useEffect(() => {
    userInfo && userInfoForm.setFieldsValue(userInfo.info);
  }, [props.visible]); // eslint-disable-line react-hooks/exhaustive-deps

  // 提交并校验
  const handleOk = async () => {
    const values = await userInfoForm.validateFields();
    const res = await operateUser(values, 'put');
    setConfirmLoading(false);
    if (res.code === 1) {
      setVisible(false);
      const { info } = userInfo;
      info.email = res.result.email;
      info.username = res.result.username;
      userInfo &&
        setUserInfo({
          ...userInfo,
          info
        });
    } else {
      message.error(res.message);
    }
  };

  // 关闭 Modal
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="我的资料"
      forceRender
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form {...layout} form={userInfoForm} initialValues={{ remember: true }}>
        <Item label="userid" name="userid">
          <Input disabled />
        </Item>
        <Item
          label="姓名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Item>
        <Item
          label="邮箱"
          name="email"
          rules={[{ required: true, message: 'Please input your nickname!' }]}
        >
          <Input />
        </Item>
      </Form>
    </Modal>
  );
};

export default UserInfoModel;
