import { responseData } from './utils';
import authsConfig from './authsConfig.json';

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
};

const users = {
  'admin-token': {
    userInfo: {
      uid: '123456',
      role: 'admin',
      introduction: '我是超级管理员',
      avatar: 'https://avatars.githubusercontent.com/u/39523094?s=400&v=4',
      roleName: '超级管理员',
      nickname: '侯飞'
    },
    auths: authsConfig
  },
  'editor-token': {
    userInfo: {
      uid: '123456',
      role: 'admin',
      introduction: '我是一般用户',
      avatar: 'https://avatars.githubusercontent.com/u/39523094?s=400&v=4',
      roleName: '用户',
      nickname: '用户'
    },
    auths: authsConfig.map((item) => item.id !== 5)
  }
};

const user = [
  // user login
  {
    url: '/api/user/login',
    type: 'post',
    response: (config) => {
      const { username } = config.body;
      const token = tokens[username];

      // mock error
      if (!token) {
        return responseData('60001', '帐号或密码错误');
      }

      return responseData('20000', 'success', token);
    }
  },

  // get user info
  {
    url: '/api/user/info.*',
    type: 'get',
    response: (config) => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return responseData('50008', '登陆失败');
      }

      return responseData('20000', 'success', info);
    }
  },

  // user logout
  {
    url: '/api/user/logout',
    type: 'post',
    response: (_) => {
      return responseData('20000', 'success');
    }
  }
];

export default user;
