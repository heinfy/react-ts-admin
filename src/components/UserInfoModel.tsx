import React, { useState, useEffect } from 'react';
import { Form, Input, Upload, Modal, Select, message } from 'antd';
import { IUserInfo } from '../redux/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { GENDER_LIST } from '../utils/constant';

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

const autoSize = { minRows: 2, maxRows: 6 };
// eslint-disable-next-line
const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

// 将上传的图片转换为 base64
// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

const { Item } = Form;
const { Option } = Select;

const UserInfoModel = (props: IProps) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [userInfoForm] = Form.useForm();
  const { visible, userInfo, setVisible } = props;
  useEffect(() => {
    if (userInfo) setImageUrl(userInfo.avatar);
    userInfoForm.setFieldsValue({
      ...userInfo,
      avatar: []
    });
  }, [props.visible]); // eslint-disable-line react-hooks/exhaustive-deps

  // 提交并校验
  const handleOk = async () => {
    try {
      if (!imageUrl) return message.error('请选择图片！');
      setConfirmLoading(true);
      const values = await userInfoForm.validateFields();
      const requestData: IUserInfo = { ...values, imageUrl };
      console.log('Success:', requestData);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
    } catch (errorInfo) {
      setConfirmLoading(false);
      console.log('Failed:', errorInfo);
    }
  };

  // 关闭 Modal
  const handleCancel = () => {
    setVisible(false);
  };

  // 图片上传之前的回调，这里采用 antd 的校验方式
  const beforeUpload = (file: RcFile) => {
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
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // 现在在接口响应数据返回图片链接 if
      const res = info.file.response;
      if (res.code === '20000') {
        setImageUrl(res.data.imgUrl);
        setLoading(false);
      } else {
        message.error(res.message);
      }
      // 这里是 antd Upload 提供的方法，将本地图片转换为 Base64 显示在前端 else
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, (imageUrl) =>
      //   setImageUrl(res.data.imgUrl);
      //   setLoading(false);
      // );
    }
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
        <Item
          label="avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/upload"
            beforeUpload={beforeUpload}
            onChange={onChange}
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
        <Item label="uid" name="uid">
          <Input disabled />
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
          <Select>
            {GENDER_LIST.map(({ value, label }: { [p: string]: string }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
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
          <Input.TextArea autoSize={autoSize} />
        </Item>
      </Form>
    </Modal>
  );
};

export default UserInfoModel;
