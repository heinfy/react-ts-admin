import request from '../utils/request';

/* Postman 06.路由接口 */
// 获取路由列表
export const getRouteList = (params) =>
  request({
    url: '/routes',
    method: 'get',
    params
  });

// 新建路由
export const createRoute = (data) =>
  request({
    url: '/route',
    method: 'post',
    data
  });

// 更新路由
export const updateRoute = (data) =>
  request({
    url: '/route',
    method: 'put',
    data
  });

// 删除路由
export const deleteRoute = (data) =>
  request({
    url: '/route',
    method: 'delete',
    data
  });

// 根据 routeid 获取路由信息 /route/:routeid
export const getRouteByRouteid = (routeid) =>
  request({
    url: `/route/${routeid}`,
    method: 'get'
  });
