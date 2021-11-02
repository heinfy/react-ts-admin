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

export const getUserInfo = (token) =>
  request({
    url: '/user',
    method: 'get',
    params: { token }
  });

export const updateUserInfo = (data) =>
  request({
    url: '/user',
    method: 'put',
    data
  });
