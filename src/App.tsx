import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

// 组件
import Layout from './layout';
import Login from './pages/login';
import pdfDownload from './pages/pdf-download';
import NotFound from './pages/not-found';
// import NotFound from './components/NotFound';
import './App.scss';

const App = () => {
  return (
    <Router>
      <Switch>
        <Redirect from="/" exact to="/app" />
        <Route path="/app" component={Layout} />
        <Route path="/login" component={Login} />
        <Route path="/pdf/download" component={pdfDownload} />
        <Route path="/404" component={NotFound} />
        <Route path="*" render={() => <Redirect to="/404" push />} />
      </Switch>
    </Router>
  );
};

export default App;
