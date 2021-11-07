import request from '../utils/request';

/* Postman 02.用户管理 */
// 获取用户列表
export const getList = (params) =>
  request({
    url: '/users',
    method: 'get',
    params
  });

// 新建用户
export const createUser = (data) =>
  request({
    url: '/user',
    method: 'post',
    data
  });

// 更新用户
export const updateUserInfo = (data) =>
  request({
    url: '/user',
    method: 'put',
    data
  });

// 删除用户
export const deleteUser = (data) =>
  request({
    url: '/user',
    method: 'delete',
    data
  });

// 根据 userid 获取用户信息
export const getUserByUserid = (userid) =>
  request({
    url: `/user/${userid}`,
    method: 'get'
  });

// 根据token获取当前用户信息
export const getUserInfo = () =>
  request({
    url: '/user',
    method: 'get'
  });

// 给用户添加角色
export const giveUserRoles = (data) =>
  request({
    url: '/giveUserRoles',
    method: 'post',
    data
  });

// 更新用户角色
export const updateUserRoles = (data) =>
  request({
    url: '/updateUserRoles',
    method: 'put',
    data
  });

// 根据 userid 获取用户角色
export const getRolesByUserid = (userid) =>
  request({
    url: `/getRolesByUserid/${userid}`,
    method: 'get'
  });

// 根据 userid 获取用户权限
export const getAuthsByUserid = (userid) =>
  request({
    url: `/getAuthsByUserid/${userid}`,
    method: 'get'
  });

// 根据 userid 获取用户路由
export const getRoutesByUserid = (userid) =>
  request({
    url: `/getAuthsByUserid/${userid}`,
    method: 'get'
  });

/* Postman 03.登录&注册&获取公钥 */
// 登录
export const login = (data) =>
  request({
    url: '/login',
    method: 'post',
    data
  });

// 获取公钥
export const getPublicKey = () =>
  request({
    url: '/getPublicKey',
    method: 'get'
  });

// 用户注册
export const register = (data) =>
  request({
    url: '/register',
    method: 'post',
    data
  });
