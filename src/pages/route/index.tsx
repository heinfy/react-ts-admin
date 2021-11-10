import React, { useRef, useState, useEffect } from 'react';
import { Table, message, Button } from 'antd';

// 组件
import SearchForm from '../../components/SearchForm';
import ControlRow from '../../components/ControlRow';
import ModalCom from '../../components/ModalCom';

// 接口
import {
  getList
  // createRoute,
  // updateRoute,
  // deleteRoute,
  // getRouteByRouteid
} from '../../api/route';

// 常量
import { columns, searchList } from './route.config';
import { INITPAGEQUERY } from '../../utils/constant';

const Route = () => {
  const searchRef: any = useRef();
  const controlRef: any = useRef();
  const [params, setParams] = useState<any>(INITPAGEQUERY);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
  const showCreateModal = () => {
    console.log('新建路由');
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <SearchForm
        searchList={searchList}
        searchFn={search}
        clearFn={clear}
        ref={searchRef}
      />
      <ModalCom
        modalConf={{
          title: '新建',
          visible: isModalVisible,
          onOk: handleOk,
          onCancel: handleCancel
        }}
      >
        <p>Some contents...</p>
      </ModalCom>
      <ControlRow ref={controlRef}>
        <Button type="primary" onClick={showCreateModal} size="small">
          创建
        </Button>
      </ControlRow>
      <Table
        bordered
        loading={loading}
        rowKey={(row: any) => row.routeid}
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

export default Route;
