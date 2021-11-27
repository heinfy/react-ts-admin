import React from 'react';
import { connect } from 'react-redux';
import { Button, Upload, Card, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { IStore } from '../redux/interface';
import { setUserInfo, setToken } from '../redux/actions';

const UploadTest = ({ token }: { token: any }) => {
  const props = {
    name: 'file',
    action: '/api/upload',
    headers: {
      token
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };
  return (
    <Card title="上传文件">
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>上传文件</Button>
      </Upload>
    </Card>
  );
};

export default connect(
  (state: IStore) => ({
    token: state.token
  }),
  { setUserInfo, setToken }
)(UploadTest);
