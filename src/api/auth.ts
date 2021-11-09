import request from '../utils/request';

/* Postman 05.权限管理 */
// 获取权限列表
export const getList = (data) =>
  request({
    url: '/auths',
    method: 'post',
    data
  });

// 新建权限
export const createAuth = (data) =>
  request({
    url: '/auth',
    method: 'post',
    data
  });

// 更新权限
export const updateAuth = (data) =>
  request({
    url: '/auth',
    method: 'put',
    data
  });

// 删除权限
export const deleteAuth = (data) =>
  request({
    url: '/auth',
    method: 'delete',
    data
  });

// 根据 authid 获取 auth 信息
export const getUserByUserid = (authid) =>
  request({
    url: `/auth/${authid}`,
    method: 'get'
  });

// menu 权限添加路由
export const giveAuthRoute = (data) =>
  request({
    url: '/giveAuthRoute',
    method: 'post',
    data
  });

// menu 权限更新路由
export const updateAuthRoute = (data) =>
  request({
    url: '/updateAuthRoute',
    method: 'put',
    data
  });
