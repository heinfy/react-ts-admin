import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, message, Button, Modal, Form } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

// 组件
import SearchForm from '../../components/SearchForm';
import ControlRow from '../../components/ControlRow';
import { EditBtn, ViewBtn, DelBtn } from '../../components/Buttons';
import RouteForm from './RouteForm';

// 接口
import { getRList, operatRoute } from '../../api/route';

// 常量
import { columns, searchList } from './route.config';
import { INITPAGEQUERY } from '../../utils/constant';

const { confirm } = Modal;

const Route = () => {
  const history = useHistory();
  const searchRef: any = useRef();
  const controlRef: any = useRef();
  const [form] = Form.useForm();
  const [params, setParams] = useState<any>(INITPAGEQUERY);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [routeList, setRouteList] = useState([]);
  const [total, setToal] = useState<number>(0);
  useEffect(() => {
    getRouteList(params);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getRouteList = async (params) => {
    setParams(params);
    setLoading(true);
    const res = await getRList(params);
    setLoading(false);
    if (res.code === 1) {
      setToal(res.result.total);
      setRouteList(res.result.data);
    } else {
      message.error(res.message);
    }
  };
  const search = () => {
    const fields = searchRef.current.getFieldsValue(true);
    const searchParams = { ...params, ...fields };
    getRouteList(searchParams);
  };
  const clear = () => {
    getRouteList(INITPAGEQUERY);
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
      const res = await operatRoute(value, method);
      if (res.code === 1) {
        message.success(res.message);
        form.resetFields();
        setIsModalVisible(false);
        getRouteList(reachParams);
      } else {
        message.error(res.message);
      }
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  // 删除某项
  const showDelModal = (routeid, routeName) => {
    confirm({
      title: '删除路由',
      icon: <ExclamationCircleOutlined />,
      content: `确定删除『${routeName}』路由吗？`,
      onOk: async () => {
        const res = await operatRoute({ routeid }, 'delete');
        if (res.code === 1) {
          message.success(res.message);
          getRouteList(INITPAGEQUERY);
        } else {
          message.error(res.message);
        }
        return new Promise((resolve) => {
          resolve(res);
        }).catch(() => message.error('Oops errors!'));
      },
      onCancel() {
        message.info('Cancel');
      }
    });
  };
  const operation = {
    title: '操作',
    dataIndex: 'routeid',
    key: 'routeid',
    render: (r: string, t: any) => {
      return (
        <>
          <ViewBtn onClick={() => history.push(`/app/route/${r}`)} />
          <EditBtn onClick={() => showEditModal(t)} />
          <DelBtn onClick={() => showDelModal(r, t.routeName)} />
        </>
      );
    }
  };
  const modalConf = {
    title: '路由',
    visible: isModalVisible,
    onOk: handleOk,
    onCancel: handleCancel
  };
  return (
    <div>
      <SearchForm
        searchList={searchList}
        searchFn={search}
        clearFn={clear}
        ref={searchRef}
      />
      <Modal {...modalConf}>
        <RouteForm form={form} />
      </Modal>
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
        dataSource={routeList}
        scroll={{ x: true }}
        pagination={{
          current: params.page,
          pageSize: params.size,
          pageSizeOptions: ['10', '20', '50', '100', '200'],
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条数据`,
          onChange: (page, size) => setRouteList({ ...params, page, size }),
          total: total
        }}
      />
    </div>
  );
};

export default Route;
