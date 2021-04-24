import { responseData } from './utils';
import authsConfig from './authsConfig.json';

const tokens = {
  admin: {
    token: 'admin-token'
  },
  guest: {
    token: 'guest-token'
  }
};

const users = {
  'admin-token': {
    userInfo: {
      uid: '358479',
      name: '崔斯特',
      gender: '1',
      nickname: '卡牌大师',
      introduction:
        '崔斯特·菲特是一名声名狼藉的纸牌高手和诈骗惯犯，世界上任何有人烟的地方都有他施展魅力和赌艺的足迹，让那些富人和痴人既羡慕又嫉恨。',
      roleId: '523',
      roleName: '超级管理员',
      avatar: '//game.gtimg.cn/images/lol/act/img/champion/TwistedFate.png'
      // avatar: 'https://avatars.githubusercontent.com/u/39523094?s=400&v=4'
    },
    auths: authsConfig
  },
  'guest-token': {
    userInfo: {
      uid: '653215',
      name: '菲兹',
      gender: '2',
      nickname: '小鱼人',
      introduction: '我是小鱼人',
      roleId: '524',
      roleName: '游客',
      avatar: '//game.gtimg.cn/images/lol/act/img/champion/Fizz.png'
    },
    auths: authsConfig.filter((item) => item.id !== 5)
  }
};

const user = [
  // user login
  {
    url: '/api/user/login',
    type: 'post',
    response: (config) => {
      const { username } = JSON.parse(config.body);
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
      console.log('logout uid：', JSON.parse(_.body).uid);
      return responseData('20000', 'success');
    }
  }
];

export default user;
