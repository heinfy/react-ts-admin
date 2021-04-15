import React, { Component } from 'react';
import { Button } from 'antd';
import { RouteComponentProps } from 'react-router';
import './index.scss';

export default class NotFound extends Component<RouteComponentProps> {
  render() {
    return (
      <section className="not-found">
        <div className="number">404</div>
        <div className="text">
          <Button onClick={() => this.props.history.replace('/app')}>
            回到首页
          </Button>
        </div>
      </section>
    );
  }
}
