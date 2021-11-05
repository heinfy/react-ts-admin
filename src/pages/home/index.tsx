import React, { useRef, useEffect } from 'react';
import SearchForm from '../../components/SearchForm';
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

const Home = () => {
  const searchRef: any = useRef();
  useEffect(() => {
    // 在副作用中可以获取ref绑定子组件的元素
    console.log('searchRef', searchRef);
  }, []);
  const search = () => {
    const fields = searchRef.current.getFieldsValue(true);
    console.log(fields);
  };
  return (
    <div className="home">
      <SearchForm searchList={list} searchFn={search} ref={searchRef} />
      <button onClick={search}>查询</button>
    </div>
  );
};

export default Home;
