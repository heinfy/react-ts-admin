import React from 'react';
import { Drawer } from 'antd';
import ReactJson from 'react-json-view';

const JsonView = ({ visible, setVisible, title, src }) => (
  <Drawer
    title={title}
    placement="right"
    width="600"
    onClose={() => setVisible(false)}
    visible={visible}
  >
    <ReactJson src={src} />
  </Drawer>
);

export default JsonView;
