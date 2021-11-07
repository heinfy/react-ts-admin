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

export const getUserInfo = () =>
  request({
    url: '/user',
    method: 'get'
  });

export const updateUserInfo = (data) =>
  request({
    url: '/user',
    method: 'put',
    data
  });
