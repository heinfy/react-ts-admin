import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';

import { getLogs } from '../../api';

import { INITPAGEQUERY } from '../../utils/constant';

const columns = [
  {
    title: 'userid',
    dataIndex: 'userid',
    key: 'userid'
  },
  {
    title: 'method',
    dataIndex: 'method',
    key: 'method'
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

const Log = () => {
  const [params, setParams] = useState<any>(INITPAGEQUERY);
  const [loading, setLoading] = useState<boolean>(false);
  const [logList, setLogList] = useState([]);
  const [total, setToal] = useState<number>(0);
  useEffect(() => {
    logList.length !== 0 && setLogList([]);
    !total && setToal(0);
    getLogList();
  }, [params.page, params.size, params.userid, params.url, params.method]); // eslint-disable-line react-hooks/exhaustive-deps
  const getLogList = async () => {
    setLoading(true);
    const res = await getLogs(params);
    setLoading(false);
    if (res.code === 1) {
      setToal(res.result.total);
      setLogList(res.result.data);
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
        dataSource={logList}
        pagination={{
          current: params.page,
          pageSize: params.size,
          pageSizeOptions: ['10', '20', '50', '100', '200'],
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条数据`,
          onChange: (page, size) => setParams({ ...params, page, size }),
          total: total
        }}
      />
    </div>
  );
};

export default Log;
