import React, { useState, useEffect, forwardRef } from 'react';
import {
  DownOutlined,
  ClearOutlined,
  SearchOutlined,
  UpOutlined
} from '@ant-design/icons';
import {
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Cascader,
  Button
} from 'antd';
import './index.scss';

const { Option } = Select;
const { RangePicker } = DatePicker;

const generateSearchItem = (srh) => {
  const { type, name, label, option = null, attr = {} } = srh;
  switch (type) {
    case 'input':
      return (
        <Form.Item label={label} name={name}>
          <Input {...attr} className="search-item" />
        </Form.Item>
      );
    case 'inputNumber':
      return (
        <Form.Item label={label} name={name}>
          <InputNumber className="search-item" {...attr} />
        </Form.Item>
      );
    case 'select':
      return (
        <Form.Item label={label} name={name}>
          <Select className="search-item" {...attr}>
            {option.map((i) => (
              <Option value={i.key} key={i.key}>
                {i.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );
      break;
    case 'rangePicker':
      return (
        <Form.Item label={label} name={name}>
          <RangePicker {...attr} />
        </Form.Item>
      );
    case 'datePicker':
      return (
        <Form.Item label={label} name={name}>
          <DatePicker {...attr} className="search-item" />
        </Form.Item>
      );
    case 'cascader':
      return (
        <Form.Item label={label} name={name}>
          <Cascader className="search-item" options={option} {...attr} />
        </Form.Item>
      );
    default:
      return null;
  }
};

const SearchForm = forwardRef((props: any, ref: any) => {
  const searchList = JSON.parse(JSON.stringify(props.searchList)) || [];
  const canExpand = searchList.length > 4;
  const searchFirRow = searchList.slice(0, 4);
  const [form] = Form.useForm();
  const [searchItems, setSearchItems] = useState<any[]>([]);
  const [expand, setExpand] = useState<boolean>(!canExpand);
  useEffect(() => {
    setSearchItems(expand ? searchList.slice(4) : []);
  }, [expand]); // eslint-disable-line react-hooks/exhaustive-deps
  const search = () => {
    form.getFieldsValue(true);
    props.searchFn();
  };
  const clear = () => {
    form.resetFields();
    props.clearFn();
  };
  return (
    <Form
      ref={ref}
      form={form}
      size="small"
      className="search-form"
      style={{ marginBottom: 20 }}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16, offset: 1 }}
    >
      <Row>
        {/* 默认展开第一行 */}
        {searchFirRow.map((i, idx) => (
          <Col span={6} key={idx}>
            {generateSearchItem(i)}
          </Col>
        ))}
        {searchItems.map((i, idx) => (
          <Col span={6} key={idx}>
            {generateSearchItem(i)}
          </Col>
        ))}
      </Row>
      <Row>
        <Col span={24} className="col-right">
          <Button type="primary" icon={<SearchOutlined />} onClick={search}>
            Search
          </Button>
          <Button
            className="btn-margin"
            icon={<ClearOutlined />}
            danger
            onClick={clear}
          >
            Clear
          </Button>
          {canExpand && (
            <Button className="btn-margin" onClick={() => setExpand(!expand)}>
              {expand ? <UpOutlined /> : <DownOutlined />} Collapse
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
});

export default SearchForm;
