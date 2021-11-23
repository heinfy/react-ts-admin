import React, { useState } from 'react';
import { Input, Button, Space, Card, message } from 'antd';

// 剪切板插件
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Clipboard = () => {
  // 1. 剪切板
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
    <Card title="1. 剪切板">
      <Space>
        <Input value={state} onChange={onChange} style={{ width: 300 }} />
        <CopyToClipboard text={state} onCopy={onCopy}>
          <Button type="primary">Copy to clipboard</Button>
        </CopyToClipboard>
      </Space>
    </Card>
  );
};

export default Clipboard;
