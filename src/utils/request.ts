import axios from 'axios';
import { message, Modal } from 'antd';

import store from '../redux/store';
import { TOKEN } from '../redux/action-types';
import { getCookies } from './auth';

// create an axios instance
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    const token = store.getState()[TOKEN] || getCookies(TOKEN);
    // 判断 token 是否存在
    if (token) {
      // let each request carry token
      // ['token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers[TOKEN] = token;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== '20000') {
      message.error(res.message || 'Error');

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        res.code === '50008' ||
        res.code === '50012' ||
        res.code === '50014'
      ) {
        // to re-login
        Modal.warning({
          title: '注意',
          content: '您登陆以过期，请重新登录',
          okText: 'OK',
          onOk() {
            console.log('to re-login');
          }
        });
      }
      return Promise.reject(res.message || 'Error');
    } else {
      return res;
    }
  },
  (error) => {
    console.log('err' + error); // for debug
    message.error(error.message || 'Error');
    return Promise.reject(error.message || 'Error');
  }
);

export default service;
