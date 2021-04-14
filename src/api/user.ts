import request from '../utils/request';

export const login = (data) =>
  request({
    url: '/user/login',
    method: 'post',
    data
  });

export const getInfo = (token) =>
  request({
    url: '/user/info',
    method: 'get',
    params: { token }
  });

export const logout = () =>
  request({
    url: '/user/logout',
    method: 'post'
  });
