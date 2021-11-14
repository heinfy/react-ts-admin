import React, { useRef, useState, useEffect } from 'react';
import { Table, Modal, Form, message, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

// 组件
import SearchForm from '../../components/SearchForm';
import ControlRow from '../../components/ControlRow';
import { EditBtn, DelBtn, AddBtn } from '../../components/Buttons';
import RoleForm from './RoleForm';
import AddAuthForm from './AddAuthForm';

// 接口
import {
  getRoles,
  operateRole,
  giveRoleAuths,
  getAuthsByRoleid
} from '../../api/role';
import { getAuths } from '../../api/auth';

import { formateData2Tree } from '../../utils/utils';

// 常量
import { columns, searchList } from './role.config';
import { INITPAGEQUERY } from '../../utils/constant';

const { confirm } = Modal;

const Role = () => {
  const searchRef: any = useRef();
  const controlRef: any = useRef();
  const [form] = Form.useForm();
  const [params, setParams] = useState<any>(INITPAGEQUERY);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [authModalVisible, setAuthModalVisible] = useState<boolean>(false);
  const [roleList, setRoleList] = useState([]);
  const [roleid, setRoleid] = useState<string>('');
  const [authTree, setAuthTree] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [total, setToal] = useState<number>(0);
  useEffect(() => {
    getRoleList(params);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getRoleList = async (params) => {
    setParams(params);
    setLoading(true);
    const res = await getRoles(params);
    setLoading(false);
    if (res.code === 1) {
      setToal(res.result.total);
      setRoleList(res.result.data);
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
  // 展示创建
  const showCreateModal = () => {
    setIsModalVisible(true);
  };
  // 展示编辑
  const showEditModal = (t) => {
    form.setFieldsValue(t);
    setIsModalVisible(true);
  };
  // 保存
  const handleOk = async () => {
    form.validateFields().then(async (value) => {
      const method = value.roleid ? 'put' : 'post';
      const reachParams = value.roleid ? params : INITPAGEQUERY;
      const res = await operateRole(value, method);
      if (res.code === 1) {
        message.success(res.message);
        form.resetFields();
        setIsModalVisible(false);
        getRoleList(reachParams);
      } else {
        message.error(res.message);
      }
    });
  };
  // 取消
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  // 删除某项
  const showDelModal = (roleid, roleName) => {
    confirm({
      title: '删除路由',
      icon: <ExclamationCircleOutlined />,
      content: `确定删除『${roleName}』路由吗？`,
      onOk: async () => {
        const res = await operateRole({ roleid }, 'delete');
        if (res.code === 1) {
          message.success(res.message);
          getRoleList(INITPAGEQUERY);
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
  // 展示权限弹窗
  const showAuthModal = async (r) => {
    // 1. 获取该 roleid 的所有权限
    const res1 = await getAuthsByRoleid(r);
    if (res1.code === 1) {
      const list = res1.result.map((i) => i.authid);
      setSelectedKeys(list);
    } else {
      message.error(res1.message);
      return;
    }
    // 2. 获取定义好的所有权限
    const res2 = await getAuths({ page: 1, size: 1000 });
    if (res2.code === 1) {
      let list = res2.result.data;
      list = list.map((i) => ({
        key: i.authid,
        pid: i.pid,
        title: i.authName
      }));
      setAuthTree(formateData2Tree(list));
    } else {
      message.error(res2.message);
      return;
    }
    // 3. 展示弹窗
    setAuthModalVisible(true);
    setRoleid(r);
  };
  // 给角色添加、更新权限
  const onRoleAuthOk = async () => {
    if (selectedKeys.length === 0) {
      message.error('角色必须添加权限！');
      return;
    }
    console.log('给角色添加、更新权限', selectedKeys);
    const params = {
      roleid,
      authids: selectedKeys
    };
    const res = await giveRoleAuths(params);
    if (res.code === 1) {
      message.success(res.message);
      setAuthModalVisible(false);
      setRoleid('');
      setAuthTree([]);
      setSelectedKeys([]);
      getRoleList(INITPAGEQUERY);
    } else {
      message.error(res.message);
    }
  };
  const operation = {
    title: '操作',
    dataIndex: 'roleid',
    key: 'roleid',
    render: (r: string, t: any) => {
      // 基础角色 和 管理员角色不允许操作
      return r === 'g_TpK5' || r === 'B0Gs1N' ? null : (
        <>
          <EditBtn onClick={() => showEditModal(t)} />
          <DelBtn onClick={() => showDelModal(r, t.roleName)} />
          <AddBtn title="添加权限" onClick={() => showAuthModal(r)} />
        </>
      );
    }
  };
  // 弹窗
  const roleModalConf = {
    title: '角色',
    visible: isModalVisible,
    onOk: handleOk,
    onCancel: handleCancel
  };
  const authModalConf = {
    title: '添加权限',
    destroyOnClose: true,
    visible: authModalVisible,
    onOk: onRoleAuthOk,
    onCancel: () => {
      setSelectedKeys([]);
      setAuthTree([]);
      setRoleid('');
      setAuthModalVisible(false);
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
      <Modal {...roleModalConf}>
        <RoleForm form={form} />
      </Modal>
      <Modal {...authModalConf}>
        <AddAuthForm
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          authTree={authTree}
        />
      </Modal>
      <ControlRow ref={controlRef}>
        <Button type="primary" onClick={showCreateModal} size="small">
          创建
        </Button>
      </ControlRow>
      <Table
        bordered
        loading={loading}
        rowKey={(row: any) => row.roleid}
        columns={[...columns, operation]}
        dataSource={roleList}
        scroll={{ x: true }}
        pagination={{
          current: params.page,
          pageSize: params.size,
          pageSizeOptions: ['10', '20', '50', '100', '200'],
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条数据`,
          onChange: (page, size) => setRoleList({ ...params, page, size }),
          total: total
        }}
      />
    </div>
  );
};

export default Role;
