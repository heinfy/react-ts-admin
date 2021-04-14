// action creator 模块 包含 n 个 action creator 函数

import { INCREMENT, DECREMENT } from './action-types';

export const increment = (number) => ({ type: INCREMENT, number });

export const decrement = (number) => ({ type: DECREMENT, number });

// 异步增加的异步 action
export const incrementAsync = (number) => {
  // 返回一个带 dispatch 参数的函数
  return (dispatch) => {
    // 执行异步操作
    setTimeout(() => {
      // 有了结果后, 分发同步 action
      dispatch(increment(number));
    }, 1000);
  };
};
