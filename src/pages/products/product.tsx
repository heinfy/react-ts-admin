import React, { useState, useEffect } from 'react';

import { exportExcel, importsExcel } from '../../utils/excel';

const Product = () => {
  const [list, setList] = useState([]);
  const [header, ActioHeader] = useState([
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      className: 'text-monospace'
    },
    {
      title: '用户名称',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '用户年龄',
      dataIndex: 'userage',
      key: 'userage'
    }
  ]);
  const [excelList, actionExcelList] = useState([
    { id: 1, username: 'leson', userage: 18 },
    {
      id: 2,
      username: 'lulu',
      userage: 30
    },
    {
      id: 3,
      username: 'beibei',
      userage: 19
    }
  ]);
  useEffect(() => {
    if (list.length > 0) {
      console.log('list', list);
    }
  }, [list]);

  return (
    <>
      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={(e) => {
          importsExcel(e).then(
            function (data: any) {
              setList(data);
            },
            function (data) {
              console.log(data);
            }
          );
        }}
      />
      <button
        onClick={() => {
          exportExcel(header, excelList, '学生信息.xlsx');
        }}
      >
        导出excel数据
      </button>
    </>
  );
};

export default Product;
