import React, { useRef, useState, useEffect } from 'react';
import { Table, message } from 'antd';

import SearchForm from '../../components/SearchForm';

import { getList } from '../../api/auth';

import { INITPAGEQUERY } from '../../utils/constant';

const columns = [
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
    title: '路由名称',
    dataIndex: 'routeName',
    key: 'routeName'
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
    key: 'createdAt'
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  }
];

const searchList = [
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

const User = () => {
  const searchRef: any = useRef();
  const [params, setParams] = useState<any>(INITPAGEQUERY);
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState([]);
  const [total, setToal] = useState<number>(0);
  useEffect(() => {
    getAuthList(params);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getAuthList = async (params) => {
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
    getAuthList(searchParams);
  };
  const clear = () => {
    getAuthList(INITPAGEQUERY);
  };
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
        rowKey={(row: any) => row.authid}
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
