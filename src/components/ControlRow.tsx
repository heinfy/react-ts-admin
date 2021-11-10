import React, { forwardRef } from 'react';
import { Row, Col } from 'antd';

const ControlRow = forwardRef((props: any, ref: any) => {
  let { children } = props;
  children =
    Object.prototype.toString.call(children) === '[object Array]'
      ? children
      : [children];
  return (
    <Row
      style={{ marginBottom: 20 }}
      ref={ref}
      gutter={[16, 16]}
      justify="start"
      align="top"
    >
      {children.map((child, idx) => (
        <Col key={idx}>{child}</Col>
      ))}
    </Row>
  );
});

export default ControlRow;
