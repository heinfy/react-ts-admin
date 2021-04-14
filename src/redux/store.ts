import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store; // 创建 store 对象内部会第一次调用 reducer() 得到初始状态值
