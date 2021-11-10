// 通用方法
import { getIcon } from '../../utils/utils';

export const columns = [
  {
    title: '路由ID',
    dataIndex: 'routeid',
    key: 'routeid',
    fixed: true,
    width: 120
  },
  {
    title: '路由名称',
    dataIndex: 'routeName',
    key: 'routeName'
  },
  {
    title: '路由',
    dataIndex: 'route',
    key: 'route'
  },
  {
    title: '路由Icon',
    dataIndex: 'icon',
    key: 'icon',
    render: (r: string) => getIcon(r)
  },
  {
    title: '排序',
    dataIndex: 'routeSort',
    key: 'routeSort'
  },
  {
    title: 'createdAt',
    dataIndex: 'createdAt',
    key: 'createdAt'
  },
  {
    title: 'updatedAt',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  }
];

export const searchList = [
  {
    type: 'input',
    name: 'routeid',
    label: '路由ID',
    attr: { placeholder: '请输入 routeid' }
  },
  {
    type: 'input',
    name: 'route',
    label: '路由',
    attr: { placeholder: '请输入 route' }
  },
  {
    type: 'input',
    name: '路由名称',
    label: 'routeName',
    attr: { placeholder: '请输入路由名称' }
  },
  {
    type: 'input',
    name: 'routeSort',
    label: '排序',
    attr: { placeholder: '请输入排序' }
  },
  {
    type: 'rangePicker',
    name: 'timeRange',
    label: '创建时间'
  }
];
