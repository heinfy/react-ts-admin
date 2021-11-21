import React, { useState } from 'react';
import { Alert, Button } from 'antd';

// 组件
import JsonEditor from '../../components/JsonEditor';

const JsonEdit = () => {
  const [data, setData] = useState(null);
  const json = {
    name: 'Collins',
    gender: 'female',
    nat: 'AU',
    email: 'sherry.collins@example.com',
    picture: 'https://randomuser.me/api/portraits/women/17.jpg'
  };
  return (
    <>
      <Alert
        message="注意：JsonEdit 的 onChange 事件会有 180ms 的延迟"
        type="warning"
        style={{ marginBottom: 20 }}
      />
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={() => console.log('改变后的json', data)}
      >
        console
      </Button>
      <JsonEditor
        json={json}
        onChange={(obj) => {
          setData(obj.jsObject);
        }}
      />
    </>
  );
};

export default JsonEdit;
