import React from 'react';
import { Select, Form, Input } from 'antd';

const UserForm = ({ form, roleList }) => {
  const userid = !!form.getFieldValue('userid');
  return (
    <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
      {userid && (
        <Form.Item label="用户ID" name="userid">
          <Input disabled />
        </Form.Item>
      )}
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          { pattern: /^[^\s]*$/, message: '禁止输入空格' },
          { required: true, message: '最多输入6个字符', max: 6 }
        ]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          { required: true, message: '请输入用户邮箱' }
          // {
          //   pattern: /^([A-z0-9_-]+\@([A-z0-9_\-\.]+\.(A-z){2,4}))/,
          //   message: '邮箱格式错误'
          // }
        ]}
      >
        <Input placeholder="请输入用户邮箱" />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入用户密码' }]}
      >
        <Input.Password placeholder="请输入用户密码" />
      </Form.Item>
      <Form.Item
        label="角色"
        name="roleids"
        rules={[{ required: true, message: '请选择用户角色' }]}
      >
        <Select mode="multiple" placeholder="请选择用户角色" allowClear>
          {roleList.map((i) => (
            <Select.Option key={i.roleid} value={i.roleid}>
              {i.roleName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
