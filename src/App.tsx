import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Layout from './layout';
import Login from './pages/login';
import NotFound from './components/NotFound';
import './App.scss';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/app/dashboard/index" push />}
        />
        <Route path="/app" component={Layout} />
        <Route path="/login" component={Login} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
