import React, { useRef, useState, useEffect } from 'react';
import { Table, Tree, Button, Modal, Form, Input, Select, message } from 'antd';
import { ExclamationCircleOutlined, DownOutlined } from '@ant-design/icons';

// 组件
import SearchForm from '../../components/SearchForm';
import ControlRow from '../../components/ControlRow';
import { EditBtn, DelBtn, AddBtn } from '../../components/Buttons';
import AuthForm from './AuthForm';

// 接口
import { getList, operateAuth, updateAuthRoute } from '../../api/auth';
import { getRList } from '../../api/route';

import { formateData2Tree } from '../../utils/utils';

// 常量
import { columns, searchList } from './auth.config';
import { INITPAGEQUERY } from '../../utils/constant';

const { confirm } = Modal;

const Auth = () => {
  const searchRef: any = useRef();
  const controlRef: any = useRef();
  const [form] = Form.useForm();
  const [routeForm] = Form.useForm();
  const [params, setParams] = useState<any>(INITPAGEQUERY);
  const [loading, setLoading] = useState<boolean>(false);
  const [isC$EModalVisible, setIsC$EModalVisible] = useState<boolean>(false);
  const [isTreeModalVisible, setIsTreeModalVisible] = useState<boolean>(false);
  const [routeModalVisible, setRouteModalVisible] = useState<boolean>(false);
  const [authList, setAuthList] = useState([]);
  const [routeList, setRouteList] = useState([]);
  const [authTree, setAuthTree] = useState([]);
  const [total, setToal] = useState<number>(0);
  useEffect(() => {
    getAuthList(params);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // 获取列表
  const getAuthList = async (params) => {
    setParams(params);
    setLoading(true);
    const res = await getList(params);
    setLoading(false);
    if (res.code === 1) {
      setToal(res.result.total);
      setAuthList(res.result.data);
    } else {
      message.error(res.message);
    }
  };
  // 获取树结构
  const getAuthTree = async () => {
    const res = await getList({ page: 1, size: 1000 });
    if (res.code === 1) {
      let list = res.result.data;
      list = list.map((i) => ({
        key: i.authid,
        pid: i.pid,
        type: i.type,
        title: i.authName,
        disabled: i.type === 'button'
      }));
      list = formateData2Tree(list);
      setAuthTree(list);
    } else {
      message.error(res.message);
    }
  };
  // 获取路由
  const getRouteList = async () => {
    const res = await getRList({ page: 1, size: 1000 });
    if (res.code === 1) {
      const list = res.result.data.map((i) => ({
        value: i.routeid,
        label: i.routeName
      }));
      setRouteList(list);
    } else {
      message.error(res.message);
    }
  };
  // 查询列表
  const search = () => {
    const fields = searchRef.current.getFieldsValue(true);
    const searchParams = { ...params, ...fields };
    getAuthList(searchParams);
  };
  // 清空重置列表
  const clear = () => {
    getAuthList(INITPAGEQUERY);
  };
  // 创建新权限
  const showCreateModal = () => {
    getAuthTree();
    getRouteList();
    setIsC$EModalVisible(true);
  };
  // 编辑权限
  const showEditModal = (t) => {
    setIsC$EModalVisible(true);
    form.setFieldsValue(t);
    getAuthTree();
    getRouteList();
  };
  // 确定
  const handleOk = async () => {
    form.validateFields().then(async (value) => {
      console.log('value', value);
      const method = value.authid ? 'put' : 'post';
      const reachParams = value.authid ? params : INITPAGEQUERY;
      const res = await operateAuth(value, method);
      if (res.code === 1) {
        message.success(res.message);
        form.resetFields();
        setIsC$EModalVisible(false);
        getAuthList(reachParams);
      } else {
        message.error(res.message);
      }
    });
  };
  // 取消
  const handleCancel = () => {
    form.resetFields();
    setIsC$EModalVisible(false);
  };
  // 删除某项
  const showDelModal = (authid, authName) => {
    confirm({
      title: '删除路由',
      icon: <ExclamationCircleOutlined />,
      content: `确定删除『${authName}』权限吗？`,
      onOk: async () => {
        const res = await operateAuth({ authid }, 'delete');
        if (res.code === 1) {
          message.success(res.message);
          getAuthList(INITPAGEQUERY);
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
  // 显示树结构
  const showTreeModal = () => {
    getAuthTree();
    setIsTreeModalVisible(true);
  };
  // 给 menu 类型的权限添加/更新路由
  const showAddModal = async (authid, routeid) => {
    routeForm.setFieldsValue({
      authid,
      routeid
    });
    setRouteModalVisible(true);
  };
  // 确定更新路由
  const handleRouteOk = () => {
    routeForm.validateFields().then(async (value) => {
      console.log('value', value);
      const res = await updateAuthRoute(value);
      if (res.code === 1) {
        message.success(res.message);
        form.resetFields();
        setRouteModalVisible(false);
        getAuthList(params);
      } else {
        message.error(res.message);
      }
    });
  };
  // 取消更新、添加路由
  const handleRouteCancel = () => {
    routeForm.resetFields();
    setRouteModalVisible(false);
  };
  const operation = {
    title: '操作',
    dataIndex: 'authid',
    key: 'authid',
    render: (r: string, t: any) => {
      return (
        <>
          {r !== '1' && <EditBtn onClick={() => showEditModal(t)} />}
          {r !== '1' && <DelBtn onClick={() => showDelModal(r, t.authName)} />}
          {r !== '1' && t.type === 'menu' && (
            <AddBtn
              title="添加/更新路由"
              onClick={() => showAddModal(r, t.routeid)}
            />
          )}
        </>
      );
    }
  };
  const c$eModalConf = {
    title: '权限',
    visible: isC$EModalVisible,
    onOk: handleOk,
    onCancel: handleCancel
  };
  const treeModalConf = {
    title: '权限树',
    visible: isTreeModalVisible,
    onCancel: () => {
      setAuthTree([]);
      setIsTreeModalVisible(false);
    },
    footer: null
  };
  const routeModalConf = {
    title: '更新路由',
    visible: routeModalVisible,
    onOk: handleRouteOk,
    onCancel: handleRouteCancel
  };
  return (
    <div>
      <SearchForm
        searchList={searchList}
        searchFn={search}
        clearFn={clear}
        ref={searchRef}
      />
      <Modal {...c$eModalConf}>
        <AuthForm form={form} authTree={authTree} routeList={routeList} />
      </Modal>
      <Modal {...treeModalConf}>
        {/* // TODO 不会默认展开 */}
        <Tree
          treeData={authTree}
          height={400}
          showLine
          switcherIcon={<DownOutlined />}
          defaultExpandedKeys={['1']}
          autoExpandParent
          defaultExpandAll
          defaultExpandParent
        />
      </Modal>
      <Modal getContainer={false} {...routeModalConf}>
        <Form form={routeForm} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item label="权限ID" name="authid">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="路由"
            name="routeid"
            rules={[
              {
                required: true,
                message: '请选择路由'
              }
            ]}
          >
            <Select placeholder="请选择路由" allowClear>
              {routeList.map((i: any) => (
                <Select.Option value={i.value} key={i.value}>
                  {i.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 20, offset: 4 }}>
            <p style={{ color: '#666', fontSize: 14 }}>
              注意：一个权限只能绑定一个路由
            </p>
          </Form.Item>
        </Form>
      </Modal>
      <ControlRow ref={controlRef}>
        <Button type="primary" onClick={showCreateModal} size="small">
          创建
        </Button>
        <Button type="primary" onClick={showTreeModal} size="small">
          查看权限树
        </Button>
      </ControlRow>
      <Table
        bordered
        loading={loading}
        rowKey={(row: any) => row.authid}
        columns={[...columns, operation]}
        dataSource={authList}
        scroll={{ x: true }}
        pagination={{
          current: params.page,
          pageSize: params.size,
          pageSizeOptions: ['10', '20', '50', '100', '200'],
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条数据`,
          onChange: (page, size) => setAuthList({ ...params, page, size }),
          total: total
        }}
      />
    </div>
  );
};

export default Auth;
