import React, { useState } from 'react';
import { Input, Button, Space, Card, Row, Col, message } from 'antd';

// 剪切板插件
import { CopyToClipboard } from 'react-copy-to-clipboard';
// zip文件生成以及下载
import JSZip from 'jszip';
import saveAs from 'file-saver';

const Mixin = () => {
  // 1.  剪切板
  const [state, setState] = useState(
    'https://github.com/houfeii/react-ts-admin'
  );
  const onChange = (e: any) => {
    setState(e.target.value);
  };
  const onCopy = () => {
    message.info('剪切板内容： ' + state);
  };
  // 2. 下载 zip 压缩包
  const downloadZip = () => {
    const zip: any = new JSZip();
    zip.folder('nested').file('hello.txt', 'Hello World\n');
    // const img: any = zip.folder('images');
    // fileContent可以是File文件也可以是Blob二进制数据
    // img.file('smile.gif', imgData, { base64: true });
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      // see FileSaver.js
      saveAs(content, 'example.zip');
    });
  };

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="1. 剪切板">
          <Space>
            <Input value={state} onChange={onChange} style={{ width: 300 }} />
            <CopyToClipboard text={state} onCopy={onCopy}>
              <Button type="primary">Copy to clipboard</Button>
            </CopyToClipboard>
          </Space>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="2. 下载zip压缩文件">
          <Space>
            <Button type="primary" onClick={downloadZip}>
              字符串zip
            </Button>
            <Button type="primary" onClick={downloadZip}>
              图片文件zip
            </Button>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default Mixin;
