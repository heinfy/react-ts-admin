import request from '../utils/request';

/* Postman 04.角色管理 */
// 获取角色列表
export const getRoles = (data) =>
  request({
    url: '/roles',
    method: 'post',
    data
  });

// 新建角色 post / 更新角色 put / 删除角色 delete
export const operateRole = (data, method) =>
  request({
    url: '/role',
    method,
    data
  });

// 根据 roleid 获取 role 信息
export const getUserByUserid = (roleid) =>
  request({
    url: `/role/${roleid}`,
    method: 'get'
  });

// 角色设置权限/更新权限
export const giveRoleAuths = (data) =>
  request({
    url: '/giveRoleAuths',
    method: 'post',
    data
  });

// 根据 roleid 获取权限列表
export const getAuthsByRoleid = (roleid) =>
  request({
    url: `/getAuthsByRoleid/${roleid}`,
    method: 'get'
  });
