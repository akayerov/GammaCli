import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import { notification } from 'antd';
// Layouts
import MainLayout from './components/layouts/main_layout_i18';

// Pages
import RecordsList from './components/Records/RecordsList';
import RecordForm from './components/Record/RecordForm';
import RecordReduxForm1Container from './components/ReduxForm/ReduxForm1Container';
import RecordReduxForm2Container from './components/ReduxForm/ReduxForm2Container';
import RecordReduxForm3_1Container from './components/ReduxForm/ReduxForm3_1Container';

// import Login from './components/Login';
import Login from './components/Login';
import Home from './components/Home';
import Private from './components/Private';
import Table1 from './components/Example/Table1';

import { logout } from './actions/auth-actions';
import store from './store';

function isLogged() {
  return !!store.getState().auth.token;
}


const RouterContainer = ({ logout }) => (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path='/' component={Home} />
      <Route path='login'  component={Login} />
      <Route path='logout' onEnter={() => logout()}>
        <IndexRedirect to='/' />
      </Route>
      <Route path='table1'>
        <IndexRoute component={Table1} />
      </Route>
      <Route path='records'
        onEnter={() => {
          if (!isLogged()) {
            notification.error({ message: 'Вы должны быть авторизованы!' });
            browserHistory.push('/login');
          }
        }}
      >
        <IndexRoute component={RecordsList} />
      </Route>

      <Route path='record/:id'>
        <IndexRoute component={RecordForm} />
      </Route>
      <Route path='record/Redux1/:id'>
        <IndexRoute component={RecordReduxForm1Container} />
      </Route>
      <Route path='record/Redux2/:id'>
        <IndexRoute component={RecordReduxForm2Container} />
      </Route>
      <Route path='record/Redux3/:id'>
        <IndexRoute component={RecordReduxForm3_1Container} />
      </Route>
      <Route
        path='private'
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
