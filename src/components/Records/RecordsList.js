import React, { Component } from 'react';
import { Table, Icon, Badge } from 'antd';
import { connect } from 'react-redux';

import { getRecordsData } from './records-actions';
// const DateToday = require('../../util/date');
import  DateToday  from '../../util/date';

const columns = [ {
  title: 'Номер',
  dataIndex: 'id',
  key: 'id'
//  sorter: (a, b) => a.age - b.age

}, {
  title: 'Дата направления',
  dataIndex: 'date_rec',
  key: 'date_rec'
}, {
  title: 'МО наименование',
  dataIndex: 'mo.name',
  key: 'mo.name'
}, {
  title: 'Фамилия',
  dataIndex: 'patient.lname',
  key: 'patient.lname',
  sorter: (a, b) => a.lname - b.lname,
  sortOrder: 'ascend'
}, {
  title: 'Имя',
  dataIndex: 'patient.fname',
  key: 'patient.fname'
}, {
  title: 'State',
  dataIndex: 'state',
  key: 'state',
  render: (text, record) => (
    <span>
      {text == '1' ? (
        <Badge status='success' text='Завершено'/>
      ) : (
        <span>
          {record.date_end < DateToday() ? (
            <Badge status='error' text='Просрочено'/>
           ) : (
             <Badge status='warning'  text='Ожидание'/>
        )}
        </span>
      )}
    </span>
   )
}, {
  title: 'Дата прихода',
  dataIndex: 'date_fact',
  key: 'date_fact'
} ];


class RecordsList extends Component {
  constructor(props) {
    super(props);
    const state = {
      filteredInfo: null,
      sortedInfo: null
    };
  }

  componentDidMount() {
    console.log('Now wiil read data');
    this.props.getRecordsData();
  }
  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  }
  clearFilters = () => {
    this.setState({ filteredInfo: null });
  }
  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null
    });
  }
  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age'
      }
    });
  }
  render() {
//    let { sortedInfo, filteredInfo } = this.state;
/*
    let  sortedInfo = this.state.sortedInfo;
    let  filteredInfo = this.state.filteredInfo;
*/
    let  sortedInfo = {};
    let  filteredInfo = {};

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    return (
      <div>
        <h1>RecordsList1</h1>

        <Table rowKey='id' columns={columns} dataSource={this.props.data} />
      </div>
    );
  }
}

export default connect(state => ({ data: state.records }), { getRecordsData })(RecordsList);
