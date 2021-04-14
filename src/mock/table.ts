import Mock from 'mockjs';
import { responseData } from './utils';

interface ITable {
  id: string;
  title: string;
  'status|1': string[];
  author: string;
  display_time: string;
  pageviews: string;
}

const list: ITable[] = [];

const obj: ITable = {
  id: '@increment',
  title: '@sentence(10, 20)',
  'status|1': ['published', 'draft', 'deleted'],
  author: 'name',
  display_time: '@datetime',
  pageviews: '@integer(300, 5000)'
};

for (let i = 0; i < 200; i++) {
  list.push(Mock.mock(obj));
}

const table = [
  {
    url: '/api/table/list',
    type: 'get',
    response: (config) => {
      const { page = 1, limit = 20 } = config.query;
      return responseData('20000', 'success', {
        total: list.length,
        rows: list.slice(limit * (page - 1), limit * page)
      });
    }
  }
];

export default table;
