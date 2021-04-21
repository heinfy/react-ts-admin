import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadFile, UploadProps } from 'antd/lib/upload/interface';

const User = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUpload = () => {
    // eslint-disable-next-line
    const formData: any = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });
    formData.append('channel', 'rus');
    console.log('upload formData', formData);
    setUploading(true);
    setTimeout(() => {
      message.success('formData in console');
      setUploading(false);
    }, 1500);
    // fetch('your url', {
    //   method: 'POST',
    //   credentials: 'include',
    //   body: formData
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });
  };

  const props: UploadProps = {
    // eslint-disable-next-line
    onRemove: (file: UploadFile<any>) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: RcFile) => {
      console.log('object', file);
      setFileList([...fileList, file]);
      return false;
    },
    fileList: fileList
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  );
};

export default User;
