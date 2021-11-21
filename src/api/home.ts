import request from '../utils/request';

/* 获取每日推荐 */
export const daily = (params) =>
  request({
    url: '/home/daily',
    method: 'get',
    params
  });
