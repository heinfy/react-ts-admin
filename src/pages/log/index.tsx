import React, { useRef, useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import JsonView from '../../components/JsonView';
import SearchForm from '../../components/SearchForm';

import { getLogs } from '../../api';

import { INITPAGEQUERY } from '../../utils/constant';

const Log = () => {
  const searchRef: any = useRef();
  const [params, setParams] = useState<any>(INITPAGEQUERY);
  const [visibleJsonView, setVisibleJsonView] = useState<boolean>(false);
  const [jsonTitle, setJsonTitle] = useState<string>('');
  const [src, setSrc] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [logList, setLogList] = useState([]);
  const [total, setToal] = useState<number>(0);
  const search = () => {
    const fields = searchRef.current.getFieldsValue(true);
    const searchParams = { ...params, ...fields };
    getLogList(searchParams);
  };
  const clear = () => {
    getLogList(INITPAGEQUERY);
  };
  const columns = [
    {
      title: 'userid',
      dataIndex: 'userid',
      key: 'userid',
      fixed: true,
      width: 120
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      key: 'method'
    },
    {
      title: '请求地址',
      dataIndex: 'url',
      key: 'url'
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
      title: '状态码',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '返回消息',
      dataIndex: 'content',
      key: 'content'
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt'
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
      type: 'select',
      name: 'method',
      label: '请求方式',
      option: [
        { value: 'GET', key: 'GET' },
        { value: 'POST', key: 'POST' },
        { value: 'DELETE', key: 'DELETE' },
        { value: 'PUT', key: 'PUT' }
      ],
      attr: { placeholder: '请选择请求方式' }
    },
    {
      type: 'input',
      name: 'url',
      label: '请求地址',
      attr: { placeholder: '请输入 url' }
    },
    {
      type: 'rangePicker',
      name: 'timeRange',
      label: '创建时间'
    }
  ];
  useEffect(() => {
    getLogList(params);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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
  const getLogList = async (params) => {
    setParams(params);
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
      <SearchForm
        searchList={searchList}
        searchFn={search}
        clearFn={clear}
        ref={searchRef}
      />
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
          onChange: (page, size) => getLogList({ ...params, page, size }),
          total: total
        }}
      />
    </div>
  );
};

export default Log;
