import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './components/layouts/main_layout_i18';

// Pages
import RecordsList from './components/RecordsList';
import Login from './components/Login';


export default (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path='/' component={RecordsList} />
      <Route path='login'  component={Login} />
      <Route path='records'>
        <IndexRoute component={RecordsList} />
      </Route>

    </Route>
  </Router>
);
