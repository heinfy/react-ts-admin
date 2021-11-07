import request from '../utils/request';

/* Postman 07.日志菜单 */
export const getLogs = (data) =>
  request({
    url: '/getLogList',
    method: 'post',
    data
  });
