import React from 'react';
import { Tag } from 'antd';
import { formatTime } from '../../utils/utils';

export const columns = [
  {
    title: '用户ID',
    dataIndex: 'userid',
    key: 'userid',
    fixed: true,
    width: 120
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '角色',
    dataIndex: 'roles',
    key: 'roles',
    width: 240,
    render: (r) => r.map((role) => <Tag key={role.roleid}>{role.roleName}</Tag>)
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (r: string) => formatTime(r)
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (r: string) => formatTime(r)
  }
];

export const searchList = [
  {
    type: 'input',
    name: 'userid',
    label: '用户id',
    attr: { placeholder: '请输入 userid' }
  },
  {
    type: 'input',
    name: 'username',
    label: '用户名',
    attr: { placeholder: '请输入用户名' }
  },
  {
    type: 'input',
    name: 'email',
    label: '邮箱',
    attr: { placeholder: '请输入邮箱' }
  },
  {
    type: 'rangePicker',
    name: 'timeRange',
    label: '创建时间'
  }
];
