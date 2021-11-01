import request from '../utils/request';

export const login = (data) =>
  request({
    url: '/login',
    method: 'post',
    data
  });

export const getPublicKey = () =>
  request({
    url: '/getPublicKey',
    method: 'get'
  });

export const getInfo = (token) =>
  request({
    url: '/user/info',
    method: 'get',
    params: { token }
  });

export const logout = (data) =>
  request({
    url: '/user/logout',
    method: 'post',
    data
  });

export const upload = (data) =>
  request({
    url: '/logout',
    method: 'post',
    data
  });
