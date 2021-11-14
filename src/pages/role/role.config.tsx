import { formatTime } from '../../utils/utils';

export const columns = [
  {
    title: '角色ID',
    dataIndex: 'roleid',
    key: 'roleid',
    fixed: true,
    width: 120
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName'
  },
  {
    title: '角色描述',
    dataIndex: 'roleDesc',
    key: 'roleDesc'
  },
  {
    title: '排序',
    dataIndex: 'roleSort',
    key: 'roleSort'
  },
  {
    title: 'createdAt',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (r: string) => formatTime(r)
  },
  {
    title: 'updatedAt',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (r: string) => formatTime(r)
  }
];

export const searchList = [
  {
    type: 'input',
    name: 'roleid',
    label: '角色ID',
    attr: { placeholder: '请输入 roleid' }
  },
  {
    type: 'input',
    name: '角色名称',
    label: 'roleName',
    attr: { placeholder: '请输入角色名称' }
  },
  {
    type: 'input',
    name: 'roleSort',
    label: '排序',
    attr: { placeholder: '请输入排序' }
  },
  {
    type: 'rangePicker',
    name: 'timeRange',
    label: '创建时间'
  }
];
