import React, { useRef } from 'react';
import { Button, Alert, Card, Space } from 'antd';

// 方法
import { exportExcel, importsExcel } from '../utils/excel';

const ExcelDemo = () => {
  const inputEl: any = useRef();
  const header = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id'
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
    ],
    excelList = [
      { id: 1, username: '小米', userage: 18 },
      { id: 2, username: '大明', userage: 30 },
      { id: 3, username: '小花', userage: 19 }
    ];
  return (
    <Card title="5. Excel">
      <Alert
        message={
          <>
            参考：
            <Button
              type="link"
              href="https://www.cnblogs.com/yuyuan-bb/p/10965104.html"
              target="_blank"
            >
              导入和导出excel表格
            </Button>
            <Button
              type="link"
              href="https://www.jb51.net/article/217189.htm"
              target="_blank"
            >
              React实现导入导出Excel文件
            </Button>
            <Button
              type="link"
              href="https://blog.csdn.net/ldc121xy716/article/details/107665738"
              target="_blank"
            >
              react实现excel的导入和导出
            </Button>
          </>
        }
        type="success"
        style={{ marginBottom: 20 }}
      />
      <Space>
        <Button
          onClick={() => {
            inputEl.current.click();
          }}
        >
          导入 Excel
        </Button>
        <Button
          onClick={() => {
            exportExcel(header, excelList, 'DEMO.xlsx');
          }}
        >
          导出 Excel
        </Button>
      </Space>
      <input
        style={{
          display: 'none'
        }}
        ref={inputEl}
        type="file"
        accept=".xls,.xlsx"
        onChange={(e) => {
          importsExcel(e).then(
            function (data: any) {
              console.log('data', data);
            },
            function (data) {
              console.log(data);
            }
          );
        }}
      />
    </Card>
  );
};

export default ExcelDemo;
