import request from '../utils/request';

/* Postman 08.获取历年出生人口图表 */
export const population = () =>
  request({
    url: '/chart/bar/population',
    method: 'get'
  });

// 获取天猫、京东历年销售额的图表
export const saleVolume = () =>
  request({
    url: '/chart/bar/saleVolume',
    method: 'get'
  });

// 获取工资
export const profit = () =>
  request({
    url: '/chart/bar/profit',
    method: 'get'
  });

// 获取工资
export const consumption = () =>
  request({
    url: '/chart/bar/consumption',
    method: 'get'
  });

// 获取工资
export const getJson = () =>
  request({
    url: '/chart/line/getJson',
    method: 'get'
  });
