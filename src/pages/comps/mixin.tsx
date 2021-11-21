import React, { useState } from 'react';
import { Input, Button, Space, Row, Col, message } from 'antd';

import { CopyToClipboard } from 'react-copy-to-clipboard';

const Mixin = () => {
  const [state, setState] = useState(
    'https://github.com/houfeii/react-ts-admin'
  );
  const onChange = (e: any) => {
    setState(e.target.value);
  };
  const onCopy = () => {
    message.info('剪切板内容： ' + state);
  };
  return (
    <div>
      <Row gutter={[16, 24]}>
        <Space>
          <span>剪切板：</span>
          <Input value={state} onChange={onChange} style={{ width: 300 }} />
          <CopyToClipboard text={state} onCopy={onCopy}>
            <Button type="primary">Copy to clipboard</Button>
          </CopyToClipboard>
        </Space>
      </Row>
    </div>
  );
};

export default Mixin;
