import React, { useRef, useState, useEffect } from 'react';
import { Table, message } from 'antd';
import * as Icon from '@ant-design/icons';

import SearchForm from '../../components/SearchForm';

import { getList } from '../../api/route';

import { INITPAGEQUERY } from '../../utils/constant';

const searchList = [
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

const User = () => {
  const searchRef: any = useRef();
  const [params, setParams] = useState<any>(INITPAGEQUERY);
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState([]);
  const [total, setToal] = useState<number>(0);
  useEffect(() => {
    getRoleList(params);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getRoleList = async (params) => {
    setParams(params);
    setLoading(true);
    const res = await getList(params);
    setLoading(false);
    if (res.code === 1) {
      setToal(res.result.total);
      setUserList(res.result.data);
    } else {
      message.error(res.message);
    }
  };
  const search = () => {
    const fields = searchRef.current.getFieldsValue(true);
    const searchParams = { ...params, ...fields };
    getRoleList(searchParams);
  };
  const clear = () => {
    getRoleList(INITPAGEQUERY);
  };
  const getIcon = (iconname: string) => React.createElement(Icon[iconname]);

  const columns = [
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

  return (
    <div>
      <SearchForm
        searchList={searchList}
        searchFn={search}
        clearFn={clear}
        ref={searchRef}
      />
      <Table
        bordered
        loading={loading}
        rowKey={(row: any) => row.routeid}
        columns={columns}
        dataSource={userList}
        scroll={{ x: true }}
        pagination={{
          current: params.page,
          pageSize: params.size,
          pageSizeOptions: ['10', '20', '50', '100', '200'],
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条数据`,
          onChange: (page, size) => setUserList({ ...params, page, size }),
          total: total
        }}
      />
    </div>
  );
};

export default User;
