import React from 'react';
import { Button, Card, Row, Col } from 'antd';

import Clipboard from '../../components/Clipboard';
import JsZip from '../../components/JsZip';

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
        <Card title="download html in pdf">
          <Button>下载页面</Button>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="window print">
          <Button>window print</Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Mixin;
