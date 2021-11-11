import React from 'react';
import { Space, Tooltip, Form, Input, InputNumber, Typography } from 'antd';

const RouteForm = ({ form }) => {
  const routeid = !!form.getFieldValue('routeid');
  return (
    <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
      {routeid && (
        <Form.Item label="路由ID" name="routeid">
          <Input disabled />
        </Form.Item>
      )}
      <Form.Item
        label="路由名称"
        name="routeName"
        rules={[
          { pattern: /^[^\s]*$/, message: '禁止输入空格' },
          { required: true, message: '最多输入6个字符', max: 6 }
        ]}
      >
        <Input placeholder="请输入路由名称" />
      </Form.Item>
      <Form.Item
        label="路由路径"
        name="route"
        rules={[
          {
            required: true,
            pattern: new RegExp(/^\/.{1,}/),
            message: '请输入正确的路由路径'
          }
        ]}
      >
        <Input placeholder="请输入路由路径" />
      </Form.Item>
      <Form.Item label="Icon">
        <Space>
          <Form.Item
            noStyle
            name="icon"
            rules={[
              {
                pattern: new RegExp(/^[A-Z][A-z]{5,50}$/),
                message: 'Icon为首字母大写的字符串'
              }
            ]}
          >
            <Input placeholder="请输入Icon" />
          </Form.Item>
          <Tooltip title="Icon图标">
            <Typography.Link
              href="https://ant-design.gitee.io/components/icon-cn/"
              target="_blank"
            >
              AntDesign Icon
            </Typography.Link>
          </Tooltip>
        </Space>
      </Form.Item>
      <Form.Item label="排序" name="routeSort" rules={[{ required: true }]}>
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
