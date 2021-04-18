/* action creator 模块 包含 n 个 action creator 函数 */

import {
  TOKEN,
  AUTHS,
  ROUTES,
  USERINFO,
  INCREMENT,
  DECREMENT
} from './action-types';
import { IUserInfo, IAuths, IRoutes } from './interface';

export const setToken = (token: string) => ({ type: TOKEN, token });

export const setUserInfo = (userInfo: IUserInfo) => ({
  type: USERINFO,
  userInfo
});

export const setAuths = (auths: IAuths[]) => ({
  type: AUTHS,
  auths
});

export const setRoutes = (routes: IRoutes[]) => ({
  type: ROUTES,
  routes
});

export const increment = (number: number) => ({ type: INCREMENT, number });

export const decrement = (number: number) => ({ type: DECREMENT, number });

// 异步增加的异步 action
export const incrementAsync = (number: number) => {
  // 返回一个带 dispatch 参数的函数
  return (dispatch) => {
    // 执行异步操作
    setTimeout(() => {
      // 有了结果后, 分发同步 action
      dispatch(increment(number));
    }, 1000);
  };
};
