import React, { Component } from 'react';
import { Table, Icon, Badge, Button } from 'antd';
import { connect } from 'react-redux';

import { getPatSelList } from './PalSelList-actions';
// const DateToday = require('../../util/date');
import  DateToday  from '../../util/date';
import { browserHistory } from 'react-router';


class RecordsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPatSelList();
  }

  render() {
    return (
      <div />
    );
  }
}

export default connect(state => ({ data: state.palSelList }), { getPatSelList })(RecordsList);
