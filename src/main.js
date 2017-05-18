console.log('react');
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Router from './router';
require('es6-promise').polyfill();

ReactDOM.render(
  <Provider store={store}><Router/></Provider>,
  document.getElementById('mount-point')
);
