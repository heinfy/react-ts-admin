import React, { useRef, useState, useEffect } from 'react';
import { Table, message } from 'antd';

import SearchForm from '../../components/SearchForm';

import { getList } from '../../api/role';

import { INITPAGEQUERY } from '../../utils/constant';

const columns = [
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
        rowKey={(row: any) => row._id}
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
