import React, { useRef, useState, useEffect } from 'react';
import {
  Table,
  Space,
  Tooltip,
  message,
  Button,
  Form,
  Input,
  InputNumber,
  Typography
} from 'antd';

// 组件
import SearchForm from '../../components/SearchForm';
import ControlRow from '../../components/ControlRow';
import ModalCom from '../../components/ModalCom';

// 接口
import {
  getList,
  createRoute
  // updateRoute,
  // deleteRoute,
  // getRouteByRouteid
} from '../../api/route';

// 方法
import { getIcon } from '../../utils/utils';

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
    console.log('新建路由');
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    form.validateFields().then(async (value) => {
      try {
        getIcon(value.icon);
        console.log('value', value);
        const res = await createRoute(value);
        if (res.code === 1) {
          form.resetFields();
          setIsModalVisible(false);
          getRoleList(INITPAGEQUERY);
        } else {
          message.error(res.message);
        }
      } catch (err) {
        console.log(err);
        message.error('找不到该Icon，请重试');
      }
    });
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
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item
            label="路由名称"
            name="routeName"
            rules={[
              { pattern: /^[^\s]*$/, message: '禁止输入空格' },
              { required: true, message: '最多输入6个字符', max: 6 }
            ]}
          >
            <Input placeholder="请输入路由名称" />
          </Form.Item>
          <Form.Item
            label="路由路径"
            name="route"
            rules={[
              {
                required: true,
                pattern: new RegExp(/^\/.{1,}/),
                message: '请输入正确的路由路径'
              }
            ]}
          >
            <Input placeholder="请输入路由路径" />
          </Form.Item>
          <Form.Item label="Icon">
            <Space>
              <Form.Item
                noStyle
                name="icon"
                rules={[
                  {
                    pattern: new RegExp(/^[A-Z][A-z]{5,50}$/),
                    message: 'Icon为首字母大写的字符串'
                  }
                ]}
              >
                <Input placeholder="请输入Icon" />
              </Form.Item>
              <Tooltip title="Icon图标">
                <Typography.Link
                  href="https://ant-design.gitee.io/components/icon-cn/"
                  target="_blank"
                >
                  AntDesign Icon
                </Typography.Link>
              </Tooltip>
            </Space>
          </Form.Item>
          <Form.Item label="排序" name="routeSort" rules={[{ required: true }]}>
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              placeholder="请输入排序"
            />
          </Form.Item>
        </Form>
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
