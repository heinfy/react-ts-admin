import request from '../utils/request';

/* 上传文件 */
export const upload = (data) =>
  request({
    url: '/upload',
    method: 'post',
    data
  });
