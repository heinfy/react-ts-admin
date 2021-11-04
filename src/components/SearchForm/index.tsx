import React, { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
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

const searchItem = (srh) => {
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

const SearchForm = ({ searchList }) => {
  const params = {};
  searchList.forEach((i) => {
    params[i.name] = null;
  });
  searchList.map((i) => ({ [i.name]: null }));
  const [searchInfo, setSearchInfo] = useState<unknown>(params);
  const [expand, setExpand] = useState<boolean>(false);
  console.log('SearchForm', searchList);
  return (
    <Form
      size="small"
      className="search-form"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16, offset: 1 }}
    >
      <Row>
        {searchList.map((i, idx) => (
          <Col span={6} key={idx}>
            {searchItem(i)}
          </Col>
        ))}
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary">Search</Button>
          <Button style={{ margin: '0 8px' }}>Clear</Button>
          <Button
            style={{ margin: '0 8px' }}
            type="text"
            onClick={() => setExpand(!expand)}
          >
            {expand ? <UpOutlined /> : <DownOutlined />} Collapse
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
