import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Alert, Space } from 'antd';

const PdfDownload = () => {
  return (
    <Card title="4. PDF 页面">
      <Alert
        message={
          <>
            这里引用了 github
            <Button
              type="link"
              target="_blank"
              href="https://github.com/PanJiaChen/vue-element-admin/tree/master/src/views/pdf"
            >
              vue-element-admin
            </Button>
          </>
        }
        type="success"
        style={{ marginBottom: 20 }}
      />
      <Space>
        <Button type="primary">
          <Link target="_blank" to={'/pdf/download'}>
            下载页面
          </Link>
        </Button>
        <Button
          type="default"
          target="_blank"
          href="https://panjiachen.github.io/vue-element-admin/#/pdf/index"
        >
          vue PDF 下载
        </Button>
      </Space>
    </Card>
  );
};

export default PdfDownload;
