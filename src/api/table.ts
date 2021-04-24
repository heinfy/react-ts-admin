import request from '../utils/request';

export const getTableList = (data) =>
  request({
    url: '/table/list',
    method: 'post',
    data
  });
