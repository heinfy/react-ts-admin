/* reducer 函数: 根据旧的 state 和指定的 action 处理返回新的 state */
import { combineReducers } from 'redux';
import {
  TOKEN,
  AUTHS,
  ROUTES,
  USERINFO,
  INCREMENT,
  DECREMENT
} from './action-types';
import { setCookies, getCookies } from '../utils/auth';

function token(state = null, action) {
  switch (action.type) {
    case TOKEN:
      setCookies(action.type, action.token);
      return action.token;
    default:
      return state || getCookies(TOKEN) || null;
  }
}

function userInfo(state = null, action) {
  switch (action.type) {
    case USERINFO:
      return action.userInfo;
    default:
      return state;
  }
}

function auths(state = [], action) {
  switch (action.type) {
    case AUTHS:
      return action.auths;
    default:
      return state;
  }
}

function routes(state = [], action) {
  switch (action.type) {
    case ROUTES:
      return action.routes;
    default:
      return state;
  }
}

function count(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.number;
    case DECREMENT:
      return state - action.number;
    default:
      return state;
  }
}

export default combineReducers({
  token,
  userInfo,
  auths,
  routes,
  count
});
