import React, { useRef, useState, useEffect } from 'react';
import { Table, Tag, message } from 'antd';

import SearchForm from '../../components/SearchForm';

import { getList } from '../../api/user';

import { INITPAGEQUERY } from '../../utils/constant';

const columns = [
  {
    title: 'userid',
    dataIndex: 'userid',
    key: 'userid',
    fixed: true,
    width: 120
  },
  {
    title: 'username',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: 'email',
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

const searchList = [
  {
    type: 'input',
    name: '用户id',
    label: 'userid',
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

const User = () => {
  const searchRef: any = useRef();
  const [params, setParams] = useState<any>(INITPAGEQUERY);
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState([]);
  const [total, setToal] = useState<number>(0);
  useEffect(() => {
    getUserList(params);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getUserList = async (params) => {
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
    getUserList(searchParams);
  };
  const clear = () => {
    getUserList(INITPAGEQUERY);
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
        rowKey={(row: any) => row.userid}
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
