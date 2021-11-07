import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';

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
    title: 'email',
    dataIndex: 'email',
    key: 'email'
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

const User = () => {
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
  return (
    <div>
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
