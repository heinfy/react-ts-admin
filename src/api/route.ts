import request from '../utils/request';

/* Postman 06.路由接口 */
// 获取路由列表
export const getList = (data) =>
  request({
    url: '/routes',
    method: 'post',
    data
  });

// 新建路由 post / 更新路由 put / 删除路由 delete
export const operatRoute = (data, method) =>
  request({
    url: '/route',
    method,
    data
  });

// 根据 routeid 获取路由信息 /route/:routeid
export const getRouteByRouteid = (routeid) =>
  request({
    url: `/route/${routeid}`,
    method: 'get'
  });
