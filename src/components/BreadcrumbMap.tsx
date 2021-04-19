import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { IStore, IRoutes } from '../redux/interface';
import { getParentForTree } from '../utils/utils';

type IProps = {
  routes: IRoutes;
} & RouteComponentProps;

interface IBreadcrumb {
  title: string;
  key: string;
}

const BreadcrumbMap = (props: IProps) => {
  const [temp, setTemp] = useState<IBreadcrumb[]>([]);
  useEffect(() => {
    const { routes } = props,
      { pathname } = props.location;
    if (routes && routes.length) {
      setTemp(getParentForTree(routes, pathname) || []);
    }
  }, [props.routes, props.location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>
        <Link to="/app/dashboard">
          <span>Home</span>
        </Link>
      </Breadcrumb.Item>
      {temp.map((item, idx) => {
        if (item.key === '/app/dashboard') return null;
        if (temp.length - 1 === idx) {
          return (
            <Breadcrumb.Item key={item.key}>
              <Link to={item.key}>
                <span>{item.title}</span>
              </Link>
            </Breadcrumb.Item>
          );
        } else {
          return (
            <Breadcrumb.Item key={item.key}>
              <span>{item.title}</span>
            </Breadcrumb.Item>
          );
        }
      })}
    </Breadcrumb>
  );
};

export default withRouter(
  connect(
    (state: IStore) => ({
      routes: state.routes
    }),
    {}
  )(BreadcrumbMap)
);
