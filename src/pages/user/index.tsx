import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';

import { getTableList } from '../../api';

interface ITable {
  id: string;
  name: string;
  age: number;
  gender: string;
  addr: string;
  phone: string;
  jd: string;
  'status|1': string[];
  hobby: string[];
  income: number;
  describe: string;
  travelList?: travel[];
  display_time: string;
  cereate_time: string;
}

interface travel {
  days: string;
  date: string;
  address: string;
  amount: string;
  feel: string;
  evaluate: string;
}

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    width: 200
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <span>{text}</span>
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender'
  },
  {
    title: '住址',
    dataIndex: 'addr',
    key: 'addr',
    width: 200
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: '工作状态',
    key: 'status',
    dataIndex: 'status'
    // render: (status) => (
    //   <>
    //     {tags.map((tag) => {
    //       let color = tag.length > 5 ? 'geekblue' : 'green';
    //       if (tag === 'loser') {
    //         color = 'volcano';
    //       }
    //       return (
    //         <Tag color={color} key={tag}>
    //           {tag.toUpperCase()}
    //         </Tag>
    //       );
    //     })}
    //   </>
    // )
  },
  {
    title: '爱好',
    dataIndex: 'hobby',
    key: 'hobby'
  },
  {
    title: '收入',
    dataIndex: 'income',
    key: 'income'
  },
  {
    title: '描述',
    dataIndex: 'describe',
    key: 'describe',
    width: 400
  },
  {
    title: '展示时间',
    dataIndex: 'update_time',
    key: 'update_time'
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time'
  }
];

const User = () => {
  const initialState = { page: 1, size: 8 };
  const [total, setTotal] = useState<number>(0);
  const [list, setList] = useState<ITable[]>([]);
  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getData = async () => {
    const result = await getTableList(initialState);
    if (result.code === '20000') {
      setList(result.data.rows);
      setTotal(result.data.total);
      console.log(total);
    } else {
      message.error(result.message);
    }
    console.log('result', result);
  };
  return (
    <div>
      <Table
        bordered
        rowKey={(record) => record.id}
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={list}
      />
    </div>
  );
};

export default User;
