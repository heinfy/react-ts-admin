import React, { useState } from 'react';
import { Button, Space, Card, message } from 'antd';

// zip文件生成以及下载
import JSZip from 'jszip';
import saveAs from 'file-saver';

import ReactFileReader from 'react-file-reader';

// https://blog.csdn.net/static_coder/article/details/86293076

const JsZip = () => {
  const [imgFile, setImgFile] = useState<any>(null);
  // 2. 下载 字符串 zip 压缩包
  const downloadStringZip = () => {
    const zip: any = new JSZip();
    const json = {
      gender: 'female',
      name: {
        title: 'Miss',
        first: 'Sherry',
        last: 'Collins'
      },
      email: 'sherry.collins@example.com',
      picture: {
        large: 'https://randomuser.me/api/portraits/women/17.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/17.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/17.jpg'
      },
      nat: 'AU'
    };
    // .folder(folderName) 添加一个文件夹
    // .file(fileName,fileContent) 添加一个txt文件
    // .file(fileName,fileContent,base64FLag) 在文件夹下添加一个图片文件
    // fileContent可以是File文件也可以是Blob二进制数据
    zip.folder('nested').file('hello.txt', JSON.stringify(json));
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, '字符串压缩包.zip');
    });
  };
  // 2. 下载 图片 zip 压缩包
  // 获取上传的图片的base64地址
  const handleFiles = (files) => {
    console.log(files);
    // setImgFile(files.fileList[0]);
    setImgFile(files.base64);
  };
  const downloadPicZip = () => {
    if (!imgFile) {
      message.error('先上传图片');
      return;
    }
    const zip: any = new JSZip();
    zip.file('上传的图片.jpg', imgFile.substring(imgFile.indexOf(',') + 1), {
      base64: true
    });
    zip
      .generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 9
        }
      })
      .then(function (content) {
        saveAs(content, '图片.zip');
      });
  };

  return (
    <Card title="2. 下载zip压缩文件">
      <Space>
        <Button type="primary" onClick={downloadStringZip}>
          下载字符串zip
        </Button>
        <ReactFileReader
          fileTypes={['.png', '.jpg', '.gif', 'jpeg']}
          base64
          multipleFiles={!1}
          handleFiles={handleFiles}
        >
          <Button>先上传jpg图片</Button>
        </ReactFileReader>
        <Button type="primary" onClick={downloadPicZip}>
          再下载图片文件zip
        </Button>
      </Space>
    </Card>
  );
};

export default JsZip;
