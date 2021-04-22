import React, { useState, useEffect } from 'react';
import { Form, Input, Upload, Modal, message } from 'antd';
import { IUserInfo } from '../redux/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import errorImage from '../assets/images/error-image.png';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';

type IProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  userInfo: IUserInfo | null;
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
};

const { Item } = Form;

const UserInfoModel = (props: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(errorImage);
  const [userInfoForm] = Form.useForm();
  const { visible, userInfo, setVisible } = props;
  useEffect(() => {
    if (userInfo) setImageUrl(userInfo.avatar);
    userInfoForm.setFieldsValue({
      ...userInfo,
      avatar: []
    });
  }, [props.visible]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    console.log('object', file);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onChange = (info: UploadChangeParam) => {
    console.log('onChange', info);
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };
  return (
    <Modal
      title="我的资料"
      forceRender
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form {...layout} form={userInfoForm} initialValues={{ remember: true }}>
        <Item
          label="头像"
          name="avatar"
          valuePropName="fileList"
          rules={[{ required: true, message: 'Please input your avatar!' }]}
        >
          <Upload
            name="avatar"
            maxCount={1}
            listType="picture-card"
            showUploadList={false}
            action="/api/upload"
            beforeUpload={beforeUpload}
            onChange={onChange}
            fileList={[]}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Item>
        <Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Item>
        <Item
          label="uid"
          name="uid"
          rules={[{ required: true, message: 'Please input your uid!' }]}
        >
          <Input />
        </Item>
        <Item
          label="昵称"
          name="nickname"
          rules={[{ required: true, message: 'Please input your nickname!' }]}
        >
          <Input />
        </Item>
        <Item
          label="性别"
          name="gender"
          rules={[{ required: true, message: 'Please input your gender!' }]}
        >
          <Input />
        </Item>
        <Item
          label="职位"
          name="roleName"
          rules={[{ required: true, message: 'Please input your roleName!' }]}
        >
          <Input />
        </Item>
        <Item
          label="签名"
          name="introduction"
          rules={[
            { required: true, message: 'Please input your introduction!' }
          ]}
        >
          <Input />
        </Item>
      </Form>
    </Modal>
  );
};

export default UserInfoModel;
