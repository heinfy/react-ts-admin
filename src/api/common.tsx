import request from '../utils/request';

// 获取展示项
export const getColumns = (path) =>
  request({
    url: '/column',
    method: 'get',
    params: {
      path
    }
  });

// 新建/更新展示项 post
export const operateColumns = (data) =>
  request({
    url: '/column/operate',
    method: 'post',
    data
  });
