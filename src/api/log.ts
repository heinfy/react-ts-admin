import request from '../utils/request';

export const getLogs = (data) =>
  request({
    url: '/getLogList',
    method: 'post',
    data
  });
