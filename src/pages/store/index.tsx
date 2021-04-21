import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IStore } from '../../redux/interface';

import { increment, decrement, incrementAsync } from '../../redux/actions';

interface IProps {
  count: number;
  increment: (number) => void;
  decrement: (number) => void;
  incrementAsync: (number) => void;
}

interface IState {
  count: number;
}

class NotFound extends Component<IProps, IState> {
  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired
  };

  // 创建ref，将其赋值给一个变量，通过ref挂载在dom节点或组件上，该ref的current属性将能拿到dom节点或组件的实例
  private numberRef = React.createRef<HTMLSelectElement>();

  increment = () => {
    const node = this.numberRef.current as HTMLSelectElement;
    const number = Number(node.value);
    this.props.increment(number);
    // 同步加
  };

  decrement = () => {
    // 同步减
    const node = this.numberRef.current as HTMLSelectElement;
    const number = Number(node.value);
    this.props.decrement(number);
  };

  incrementIfOdd = () => {
    // 奇数加
    const node = this.numberRef.current as HTMLSelectElement;
    const number = Number(node.value);

    const count = this.props.count;
    if (count % 2 === 1) {
      this.props.increment(number);
    }
  };

  incrementAsync = () => {
    const node = this.numberRef.current as HTMLSelectElement;
    const number = Number(node.value);
    this.props.incrementAsync(number);
  };

  render() {
    const count = this.props.count;
    return (
      <div
        style={{ border: '2px solid blue', padding: 20, textAlign: 'center' }}
      >
        <p>react状态 | click {count} times</p>
        <div>
          <select ref={this.numberRef}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>{' '}
          &nbsp;&nbsp;
          <button onClick={this.increment}>+</button>&nbsp;&nbsp;
          <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
          <button onClick={this.incrementIfOdd}>奇数时增加</button>
          &nbsp;&nbsp;
          <button onClick={this.incrementAsync}>异步增加</button>
        </div>
      </div>
    );
  }
}

/*
// 将 redux 中的 state 数据映射成UI组件中的一般属性
function mapStateToProps(state) {
  return {
    count: state
  }
}

// 将 redux 中的包含 dispatch 代码的函数映射成UI组件中的一般方法
function mapDispatchToProps(dispatch) {
  return {
    increment: number => dispatch(increment(number)),
    decrement: number => dispatch(decrement(number))
  }
}

const mapDispatchToProps = { increment, decrement }
export default connect(mapStateToProps, mapDispatchToProps)(ReactRedux)
*/

export default connect((state: IStore) => ({ count: state.count }), {
  increment,
  decrement,
  incrementAsync
})(NotFound);
