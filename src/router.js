import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './components/layouts/main_layout_i18';

// Pages
import RecordsList from './components/RecordsList';
import Login from './components/Login';

const RouterContainer = ({ token }) => (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path='/' component={RecordsList} />
      <Route path='login'  component={Login} />
      <Route
        path='records'
        onEnter={() => {
          if (!token) {
            browserHistory.push('/login');
          }
        }}
      >
        <IndexRoute component={RecordsList} />
      </Route>

    </Route>
  </Router>
);

export default connect(
  state => ({ token: state.token })
)(RouterContainer);
