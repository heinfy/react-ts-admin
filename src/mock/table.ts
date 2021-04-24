import Mock from 'mockjs';
import { responseData } from './utils';

interface ITable {
  id: string;
  name: string;
  age: number;
  gender: string;
  addr: string;
  phone: string;
  jd: string;
  'status|1': string[];
  hobby: string[];
  income: number;
  describe: string;
  travelList?: travel[];
  update_time: string;
  create_time: string;
}

interface travel {
  days: string;
  date: string;
  address: string;
  amount: string;
  feel: string;
  evaluate: string;
}

const list: ITable[] = [];

for (let i = 0; i < 218; i++) {
  list.push(
    Mock.mock({
      id: '@id()',
      name: '@cname()',
      'age|18-65': 18,
      'gender|1': ['1', '2'],
      addr: '@county(true)',
      phone: /1[3456789]\d{9}/,
      jd: '@cword(2, 5)',
      'status|1': ['摸鱼中', '加班中', '适当工作', '996'],
      hobby: '@cword(2, 5)',
      income: 10000000,
      describe: '@cparagraph()',
      'travelList|0-10': [
        {
          'days|1-30': 30,
          date: '@date("yyyy-MM-dd")',
          address: '@city(true)',
          'amount|10000-50000': 10000,
          feel: '@cparagraph()',
          'evaluate|1-5': '✨'
        }
      ],
      update_time: '@datetime("yyyy-MM-dd HH:mm:ss")',
      create_time: '@datetime("yyyy-MM-dd HH:mm:ss")'
    })
  );
}

const table = [
  {
    url: '/api/table/list',
    type: 'post',
    response: (config) => {
      const { page = 1, size = 20 } = JSON.parse(config.body);
      return responseData('20000', 'success', {
        total: list.length,
        rows: list.slice(size * (page - 1), size * page)
      });
    }
  }
];

export default table;
