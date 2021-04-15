import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Home from '../home';
// import User from '../../pages/user/user';
// import Bar from '../../pages/charts/bar';
// import Line from '../../pages/charts/line';
// import Pie from '../../pages/charts/pie';
// import Order from '../../pages/order/order';
import Store from '../../pages/store';
import NotFound from '../not-found';

const Admin = () => {
  return (
    <Switch>
      {/* <Redirect from="/app" exact to="/app/dashboard" push /> */}
      <Route
        exact
        path="/app"
        render={() => <Redirect to="/app/dashboard" push />}
      />
      <Route path="/app/dashboard" component={Home} />
      {/* <Route path="/user" component={User} />
          <Route path="/charts/bar" component={Bar} />
          <Route path="/charts/pie" component={Pie} />
          <Route path="/charts/line" component={Line} />
          <Route path="/order" component={Order} />
        <Route component={NotFound} /> */}
      <Route path="/store" component={Store} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Admin;
