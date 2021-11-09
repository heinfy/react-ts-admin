import request from '../utils/request';

/* Postman 04.角色管理 */
// 获取角色列表
export const getList = (data) =>
  request({
    url: '/roles',
    method: 'post',
    data
  });

// 新建角色
export const createRole = (data) =>
  request({
    url: '/role',
    method: 'post',
    data
  });

// 更新角色
export const updateRole = (data) =>
  request({
    url: '/role',
    method: 'put',
    data
  });

// TODO ？
// 删除角色
export const deleteRole = (data) =>
  request({
    url: '/role',
    method: 'delete',
    data
  });

// 根据 roleid 获取 role 信息
export const getUserByUserid = (roleid) =>
  request({
    url: `/role/${roleid}`,
    method: 'get'
  });

// 角色设置权限
export const giveRoleAuths = (data) =>
  request({
    url: '/giveRoleAuths',
    method: 'post',
    data
  });

// 角色更新权限
export const updateRoleAuths = (data) =>
  request({
    url: '/updateRoleAuths',
    method: 'put',
    data
  });

// 根据 roleid 获取权限列表
export const getAuthsByRoleid = (roleid) =>
  request({
    url: `/getAuthsByRoleid/${roleid}`,
    method: 'get'
  });
