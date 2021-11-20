import React from 'react';
import { Form, Input, InputNumber } from 'antd';

const RouteForm = ({ form }) => {
  const roleid = !!form.getFieldValue('roleid');
  return (
    <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
      {roleid && (
        <Form.Item label="角色ID" name="roleid">
          <Input disabled />
        </Form.Item>
      )}
      <Form.Item
        label="角色名称"
        name="roleName"
        rules={[
          { pattern: /^[^\s]*$/, message: '禁止输入空格' },
          { required: true, message: '最多输入10个字符', max: 10 }
        ]}
      >
        <Input placeholder="请输入角色名称" />
      </Form.Item>
      <Form.Item
        label="角色描述"
        name="roleDesc"
        rules={[
          { pattern: /^[^\s]*$/, message: '禁止输入空格' },
          { required: true, message: '最多输入30个字符', max: 30 }
        ]}
      >
        <Input placeholder="请输入角色描述" />
      </Form.Item>
      <Form.Item label="排序" name="roleSort" rules={[{ required: true }]}>
        <InputNumber
          style={{ width: '100%' }}
          min={1}
          placeholder="请输入排序"
        />
      </Form.Item>
    </Form>
  );
};

export default RouteForm;
