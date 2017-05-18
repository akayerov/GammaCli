import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import { notification } from 'antd';
// Layouts
import MainLayout from './components/layouts/main_layout_i18';

// Pages
import RecordsList from './components/RecordsList';
import Login from './components/Login';
import Private from './components/Private';

import { logout } from './actions/auth-actions';
import store from './store';

function isLogged() {
  return !!store.getState().token;
}

const RouterContainer = ({ logout }) => (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path='/' component={RecordsList} />
      <Route path='login'  component={Login} />
      <Route path="logout" onEnter={() => logout()}>
        <IndexRedirect to="/" />
      </Route>
      <Route path='records'>
        <IndexRoute component={RecordsList} />
      </Route>
      <Route
        path="private"
        onEnter={() => {
          if (!isLogged()) {
            notification.error({ message: 'Prove that you are Vasya' });
            browserHistory.push('/');
          }
        }}
      >
        <IndexRoute component={Private}/>
      </Route>
    </Route>
  </Router>
);

export default connect(
  null,
  { logout }
)(RouterContainer);
