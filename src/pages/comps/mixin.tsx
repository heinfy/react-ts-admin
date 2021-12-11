import React from 'react';
import { Row, Col } from 'antd';

import Clipboard from '../../components/Clipboard';
import JsZip from '../../components/JsZip';
import UploadTest from '../../components/UploadTest';
import PdfDownload from '../../components/PdfDownload';
import ExcelDemo from '../../components/ExcelDemo';

const Mixin = () => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Clipboard />
      </Col>
      <Col span={8}>
        <JsZip />
      </Col>
      <Col span={8}>
        <UploadTest />
      </Col>
      <Col span={8}>
        <PdfDownload />
      </Col>
      <Col span={8}>
        <ExcelDemo />
      </Col>
    </Row>
  );
};

export default Mixin;
