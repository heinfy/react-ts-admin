import React, { Component } from 'react';
import SearchForm from '../../components/SearchForm/index';
import './index.scss';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake'
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }
        ]
      }
    ]
  }
];

const list = [
  {
    type: 'input',
    name: 'name',
    label: '姓名',
    attr: { placeholder: '请输入' }
  },
  {
    type: 'inputNumber',
    name: 'age',
    label: '年纪',
    attr: { placeholder: '请输入' }
  },
  {
    type: 'select',
    name: 'hobbies',
    label: '爱好',
    option: [
      { value: '苹果', key: 'apple' },
      { value: '香蕉', key: 'banana' }
    ],
    attr: { placeholder: '请输入' }
  },
  {
    type: 'rangePicker',
    name: 'timeRange',
    label: '时间段'
  },
  {
    type: 'datePicker',
    name: 'date',
    label: '周',
    attr: { picker: 'week' }
  },
  {
    type: 'cascader',
    name: 'location',
    label: '省市区',
    option: options,
    attr: { placeholder: '请输入' }
  }
];

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <SearchForm searchList={list} />
        <h1>这是首页</h1>
      </div>
    );
  }
}
