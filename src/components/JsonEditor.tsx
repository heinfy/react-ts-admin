import React from 'react';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/zh-cn';

import { Card } from 'antd';

const JsonEditor = ({ json = {}, onChange }) => {
  const colors = {
    default: '#D4D4D4',
    background: '#23241f',
    background_warning: '#ff1d66',
    string: '#fff',
    number: '#3ac1d7',
    colon: '#49B8F7',
    keys: '#59A5D8',
    keys_whiteSpace: '#835FB6',
    primitive: '#386FA5'
  };
  return (
    <div style={{ width: '100%' }}>
      <Card
        title="eact-json-editor-ajrm"
        extra={
          <a
            href="https://github.com/AndrewRedican/react-json-editor-ajrm"
            target="_blank"
            rel="noreferrer"
          >
            github 地址
          </a>
        }
      >
        <JSONInput
          id="a_unique_id"
          placeholder={json}
          colors={colors}
          locale={locale}
          onChange={onChange}
          height="550px"
          width="100%"
        />
      </Card>
    </div>
  );
};

export default JsonEditor;
