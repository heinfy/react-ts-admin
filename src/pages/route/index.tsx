import React, { useRef, useState, useEffect } from 'react';
import { Table, message, Button, Form } from 'antd';

// 组件
import SearchForm from '../../components/SearchForm';
import ControlRow from '../../components/ControlRow';
import ModalCom from '../../components/ModalCom';
import { EditBtn, ViewBtn, DelBtn } from '../../components/Buttons';
import RouteForm from './RouteForm';

// 接口
import {
  getList,
  createRoute
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
  const [form] = Form.useForm();
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
    setIsModalVisible(true);
  };
  const showEditModal = (t) => {
    form.setFieldsValue(t);
    setIsModalVisible(true);
  };
  const handleOk = async () => {
    form.validateFields().then(async (value) => {
      const method = value.routeid ? 'put' : 'post';
      const reachParams = value.routeid ? params : INITPAGEQUERY;
      const res = await createRoute(value, method);
      if (res.code === 1) {
        form.resetFields();
        setIsModalVisible(false);
        getRoleList(reachParams);
      } else {
        message.error(res.message);
      }
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  const operation = {
    title: '操作',
    dataIndex: 'routeid',
    key: 'routeid',
    render: (r: string, t: any) => {
      return (
        <>
          <ViewBtn />
          <EditBtn onClick={() => showEditModal(t)} />
          <DelBtn />
        </>
      );
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
      <ModalCom
        modalConf={{
          title: '路由',
          visible: isModalVisible,
          onOk: handleOk,
          onCancel: handleCancel
        }}
      >
        <RouteForm form={form} />
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
        columns={[...columns, operation]}
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
