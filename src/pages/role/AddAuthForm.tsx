import React, { useState } from 'react';
import { Tree } from 'antd';

const RouteForm = ({ selectedKeys, setSelectedKeys, authTree }) => {
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(selectedKeys);
  const onCheck = (checkedKeysValue) => {
    setSelectedKeys(checkedKeysValue.checked);
    setCheckedKeys(checkedKeysValue.checked);
  };
  return (
    <Tree
      checkable
      checkStrictly
      defaultExpandedKeys={['1']}
      treeData={authTree}
      selectedKeys={selectedKeys}
      checkedKeys={checkedKeys}
      onCheck={onCheck}
      defaultCheckedKeys={selectedKeys}
      defaultSelectedKeys={selectedKeys}
    />
  );
};

export default RouteForm;
