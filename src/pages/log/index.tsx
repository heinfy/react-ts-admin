import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import JsonView from '../../components/JsonView';

import { getLogs } from '../../api';

import { INITPAGEQUERY } from '../../utils/constant';

const Log = () => {
  const [params, setParams] = useState<any>(INITPAGEQUERY);
  const [visibleJsonView, setVisibleJsonView] = useState<boolean>(false);
  const [jsonTitle, setJsonTitle] = useState<string>('');
  const [src, setSrc] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [logList, setLogList] = useState([]);
  const [total, setToal] = useState<number>(0);
  const columns = [
    {
      title: 'userid',
      dataIndex: 'userid',
      key: 'userid',
      fixed: true,
      width: 120
    },
    {
      title: 'url',
      dataIndex: 'url',
      key: 'url',
      render: (r: any, t: any) => `${t.method} ${r}`
    },
    {
      title: '请求体',
      dataIndex: 'body',
      key: 'body',
      render: (r: any, t: any) => (
        <Button
          type="primary"
          size="small"
          onClick={() => viewJson(r, t.userid)}
        >
          请求体
        </Button>
      )
    },
    {
      title: '请求条件',
      dataIndex: 'query',
      key: 'query',
      render: (r: any, t: any) => (
        <Button size="small" onClick={() => viewJson(r, t.userid)}>
          请求条件
        </Button>
      )
    },
    {
      title: '请求头',
      dataIndex: 'headers',
      key: 'headers',
      render: (r: any, t: any) => (
        <Button
          type="dashed"
          size="small"
          onClick={() => viewJson(r, t.userid)}
        >
          请求头
        </Button>
      )
    },
    {
      title: '返回值',
      dataIndex: 'content',
      key: 'content',
      render: (r: any, t: any) => (
        <Button size="small" onClick={() => viewJson(r, t.userid)}>
          返回值
        </Button>
      )
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt'
    }
  ];
  useEffect(() => {
    logList.length !== 0 && setLogList([]);
    !total && setToal(0);
    getLogList();
  }, [params.page, params.size, params.userid, params.url, params.method]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!visibleJsonView) {
      setSrc({});
      setJsonTitle('');
    }
  }, [visibleJsonView]); // eslint-disable-line react-hooks/exhaustive-deps
  const viewJson = (src: unknown, title: string) => {
    setVisibleJsonView(true);
    setSrc(src || {});
    setJsonTitle(title);
  };
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
      <JsonView
        visible={visibleJsonView}
        setVisible={setVisibleJsonView}
        title={jsonTitle}
        src={src}
      />
      <Table
        bordered
        loading={loading}
        rowKey={(row: any) => row._id}
        columns={columns}
        dataSource={logList}
        scroll={{ x: true }}
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
