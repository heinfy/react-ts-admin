// reducer 函数: 根据旧的 state 和指定的 action 处理返回新的 state
import { combineReducers } from 'redux';
import { INCREMENT, DECREMENT } from './action-types';

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
  count
});
