import { formatTime } from '../../utils/utils';

export const columns = [
  {
    title: '权限ID',
    dataIndex: 'authid',
    key: 'authid',
    fixed: true,
    width: 120
  },
  {
    title: '权限名',
    dataIndex: 'authName',
    key: 'authName'
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '父ID',
    dataIndex: 'pid',
    key: 'pid'
  },
  {
    title: '路由名称',
    dataIndex: 'routeName',
    key: 'routeName'
  },
  {
    title: '路由ID',
    dataIndex: 'routeid',
    key: 'routeid'
  },
  {
    title: '排序',
    dataIndex: 'authSort',
    key: 'authSort'
  },
  {
    title: '描述',
    dataIndex: 'authDesc',
    key: 'authDesc'
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
    name: 'authid',
    label: '权限ID',
    attr: { placeholder: '请输入 authid' }
  },
  {
    type: 'input',
    name: 'authName',
    label: '权限名称',
    attr: { placeholder: '请输入用户名' }
  },
  {
    type: 'input',
    name: 'pid',
    label: '父ID',
    attr: { placeholder: '请输入父ID' }
  },
  {
    type: 'select',
    name: 'type',
    label: '权限类型',
    option: [
      { value: '菜单', key: 'menu' },
      { value: '按钮', key: 'button' }
    ],
    attr: { placeholder: '请选择权限类型' }
  },
  {
    type: 'inputNumber',
    name: 'authSort',
    label: '权限排序',
    attr: { placeholder: '请输入权限排序' }
  },
  {
    type: 'rangePicker',
    name: 'timeRange',
    label: '创建时间'
  }
];
