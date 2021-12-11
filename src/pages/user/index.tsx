import React, { useRef, useState, useEffect } from 'react';
import { Table, message, Form, Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { JSEncrypt } from 'jsencrypt';

// 组件
import SearchForm from '../../components/SearchForm';
import { EditBtn, DelBtn } from '../../components/Buttons';
import ControlRow from '../../components/ControlRow';
import UserForm from './UserForm';

// 接口
import { getPublicKey } from '../../api/user';
import { getUsers, operateUser } from '../../api/user';
import { getRoles } from '../../api/role';

// 方法
import { exportExcel } from '../../utils/excel';
import { formatTime, getExcelData } from '../../utils/utils';

// 常量
import { columns, searchList } from './user.config';
import { INITPAGEQUERY } from '../../utils/constant';

const { confirm } = Modal;

const User = () => {
  const searchRef: any = useRef();
  const controlRef: any = useRef();
  const [form] = Form.useForm();
  const [params, setParams] = useState<any>(INITPAGEQUERY);
  const [loading, setLoading] = useState<boolean>(false);
  const [exportLoading, setExportLoading] = useState<boolean>(false);
  const [isC$EModalVisible, setIsC$EModalVisible] = useState<boolean>(false);
  const [userList, setUserList] = useState([]);
  const [pubKey, setPulKey] = useState<string>('');
  const [roleList, setRoleList] = useState([]);
  const [total, setToal] = useState<number>(0);
  useEffect(() => {
    getUserList(params);
    getKey();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // 获取加密密钥
  const getKey = async () => {
    const res = await getPublicKey();
    if (res.code === 1) {
      setPulKey(res.result);
    } else {
      message.error(res.message);
    }
  };
  // 获取用户列表
  const getUserList = async (params) => {
    setParams(params);
    setLoading(true);
    const res = await getUsers(params);
    setLoading(false);
    if (res.code === 1) {
      setToal(res.result.total);
      setUserList(res.result.data);
    } else {
      message.error(res.message);
    }
  };
  // 获取角色列表
  const getRoleList = async () => {
    const res = await getRoles({ page: 1, size: 1000 });
    if (res.code === 1) {
      setRoleList(res.result.data);
    } else {
      message.error(res.message);
    }
  };
  // 查询
  const search = () => {
    const fields = searchRef.current.getFieldsValue(true);
    const searchParams = { ...params, ...fields };
    getUserList(searchParams);
  };
  // 重置
  const clear = () => {
    getUserList(INITPAGEQUERY);
  };
  // 创建用户
  const showCreateModal = () => {
    getRoleList();
    setIsC$EModalVisible(true);
  };
  // 编辑用户
  const showEditModal = (t) => {
    getRoleList();
    setIsC$EModalVisible(true);
    const { userid, username, email, roles } = t;
    const roleids = roles.map((i) => i.roleid);
    form.setFieldsValue({
      userid,
      username,
      email,
      roleids
    });
  };
  // 删除用户
  const showDelModal = (userid, username) => {
    confirm({
      title: '删除用户',
      icon: <ExclamationCircleOutlined />,
      content: `确定删除『${username}』用户吗？`,
      onOk: async () => {
        const res = await operateUser({ userid }, 'delete');
        if (res.code === 1) {
          message.success(res.message);
          getUserList(INITPAGEQUERY);
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
  // 确定
  const handleOk = async () => {
    form.validateFields().then(async (value) => {
      const encryptor = new JSEncrypt();
      encryptor.setPublicKey(pubKey);
      const password = encryptor.encrypt(value.password);
      console.log('value', value);
      const method = value.userid ? 'put' : 'post';
      const reachParams = value.userid ? params : INITPAGEQUERY;
      const res = await operateUser({ ...value, password }, method);
      if (res.code === 1) {
        message.success(res.message);
        form.resetFields();
        setIsC$EModalVisible(false);
        getUserList(reachParams);
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
  const operation = {
    title: '操作',
    dataIndex: 'userid',
    key: 'userid',
    render: (r: string, t: any) => {
      return (
        <>
          <EditBtn onClick={() => showEditModal(t)} />
          <DelBtn onClick={() => showDelModal(r, t.username)} />
        </>
      );
    }
  };
  const c$eModalConf = {
    title: '用户',
    visible: isC$EModalVisible,
    onOk: handleOk,
    onCancel: handleCancel
  };
  // 导出文件
  const exportTableData = async (params: any) => {
    setExportLoading(true);
    const result = await getExcelData({ ...params, page: 1 }, getUsers, 1);
    const headers = columns.map((i: any) => ({
      title: i.title,
      dataIndex: i.dataIndex,
      key: i.key
    }));
    const data = result.map((i: any) => {
      const { userid, username, email, createdAt, updatedAt, roles } = i;
      return {
        userid,
        username,
        email,
        createdAt: formatTime(createdAt),
        updatedAt: formatTime(updatedAt),
        roles: roles.map((i: any) => i.roleName).join(',')
      };
    });
    exportExcel(headers, data, '用户列表.xlsx');
    setExportLoading(false);
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
        <UserForm form={form} roleList={roleList} />
      </Modal>
      <ControlRow ref={controlRef}>
        <Button type="primary" onClick={showCreateModal} size="small">
          创建
        </Button>
        <Button
          loading={exportLoading}
          type="primary"
          onClick={() => exportTableData(INITPAGEQUERY)}
          size="small"
        >
          导出所有 excel
        </Button>
        <Button
          loading={exportLoading}
          type="primary"
          onClick={() => exportTableData(params)}
          size="small"
        >
          按查询条件导出 excel
        </Button>
      </ControlRow>
      <Table
        bordered
        loading={loading}
        rowKey={(row: any) => row.userid}
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

export default User;
