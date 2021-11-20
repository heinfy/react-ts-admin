import React, { useState } from 'react';
import {
  Select,
  Space,
  Form,
  Input,
  TreeSelect,
  InputNumber,
  Button
} from 'antd';

const AuthForm = ({ form, authTree, routeList }) => {
  const [isMenu, setIsMenu] = useState<boolean>(
    !!form.getFieldValue('routeid')
  );
  const authid = !!form.getFieldValue('authid');
  const typeChange = (value) => {
    setIsMenu(value === 'menu');
  };
  return (
    <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
      {authid && (
        <Form.Item label="权限ID" name="authid">
          <Input disabled />
        </Form.Item>
      )}
      <Form.Item
        label="权限名称"
        name="authName"
        rules={[
          { pattern: /^[^\s]*$/, message: '禁止输入空格' },
          { required: true, message: '最多输入10个字符', max: 10 }
        ]}
      >
        <Input placeholder="请输入权限名称" />
      </Form.Item>
      <Form.Item
        label="权限类型"
        name="type"
        rules={[
          {
            required: true,
            message: '请选择权限类型'
          }
        ]}
      >
        {/* 更新权限时，按钮 路由不能切换 */}
        <Select
          disabled={!!authid}
          placeholder="请选择权限类型"
          allowClear
          onChange={typeChange}
        >
          <Select.Option value="button">按钮权限</Select.Option>
          <Select.Option value="menu">路由权限</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="父级菜单">
        <Space>
          <Form.Item
            noStyle
            name="pid"
            rules={[
              {
                required: true,
                message: '请选择父级菜单'
              }
            ]}
          >
            <TreeSelect
              style={{ width: 200 }}
              treeDefaultExpandedKeys={['1']}
              placeholder="请选择父级菜单"
              treeData={authTree}
            />
          </Form.Item>
          <Button danger type="text" disabled>
            按钮权限不可选中
          </Button>
        </Space>
      </Form.Item>
      <Form.Item
        label="权限描述"
        name="authDesc"
        rules={[
          { pattern: /^[^\s]*$/, message: '禁止输入空格' },
          { required: true, message: '最多输入30个字符', max: 30 }
        ]}
      >
        <Input placeholder="请输入权限描述" />
      </Form.Item>
      {isMenu && (
        <Form.Item
          label="指向路由"
          name="routeid"
          rules={[
            {
              required: true,
              message: '请选择路由'
            }
          ]}
        >
          <Select
            disabled={!!authid}
            placeholder="请选择路由"
            allowClear
            showSearch
            filterOption={(input: string, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {routeList.map((i: any) => (
              <Select.Option value={i.value} key={i.value}>
                {i.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item label="排序" name="authSort" rules={[{ required: true }]}>
        <InputNumber
          style={{ width: '100%' }}
          min={1}
          placeholder="请输入排序"
        />
      </Form.Item>
    </Form>
  );
};

export default AuthForm;
