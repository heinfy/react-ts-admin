import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { IStore, IRoutes, IAuths } from '../../redux/interface';
import { rRoutes } from './routes';
import NotFound from '../not-found';

type Props = {
  routes: IRoutes[];
} & RouteComponentProps;

const Admin = (props: Props) => {
  const [renderRoutes, setRenderRoutes] = useState<IAuths[]>([]);
  const filterRoutes = (rts: IRoutes[]) => {
    const rRoutes: IAuths[] = [];
    const fileterAuths = (subRoutes: IRoutes[]) => {
      subRoutes.forEach((r) => {
        if (r.children) {
          fileterAuths(r.children);
        } else {
          rRoutes.push(r);
        }
      });
    };
    fileterAuths(rts);
    return rRoutes;
  };
  useEffect(() => {
    setRenderRoutes(filterRoutes(props.routes));
  }, [props.routes]);
  return (
    <Switch>
      <Route
        exact
        path="/app"
        render={() => <Redirect to="/app/dashboard" push />}
      />
      {renderRoutes.map((route) => (
        <Route
          key={route.authid}
          path={route.route}
          component={rRoutes[route.route]}
        />
      ))}
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default connect(
  (state: IStore) => ({
    routes: state.routes
  }),
  {}
)(Admin);
