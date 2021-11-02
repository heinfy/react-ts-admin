import request from '../utils/request';

export const getLogs = (params) =>
  request({
    url: '/getLogList',
    method: 'get',
    params
  });
