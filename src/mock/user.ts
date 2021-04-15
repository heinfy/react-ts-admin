import { responseData } from './utils';

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
    roles: ['admin'],
    introduction: '我是超级管理员',
    avatar: 'https://avatars.githubusercontent.com/u/39523094?s=400&v=4',
    name: '超级管理员'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: '我是编辑',
    avatar: 'https://avatars.githubusercontent.com/u/39523094?s=400&v=4',
    name: '编辑'
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