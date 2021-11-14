import request from '../utils/request';

/* Postman 05.权限管理 */
// 获取权限列表
export const getList = (data) =>
  request({
    url: '/auths',
    method: 'post',
    data
  });

// 新建权限 post / 更新权限 put / 删除权限 delete
export const operateAuth = (data, method) =>
  request({
    url: '/auth',
    method,
    data
  });

// 根据 authid 获取 auth 信息
export const getUserByUserid = (authid) =>
  request({
    url: `/auth/${authid}`,
    method: 'get'
  });

// menu 权限更新路由
export const updateAuthRoute = (data) =>
  request({
    url: '/updateAuthRoute',
    method: 'put',
    data
  });
