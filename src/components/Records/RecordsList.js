import React, { Component } from 'react';
import { Table, Icon, Badge, Button } from 'antd';
import { connect } from 'react-redux';

import { getRecordsData } from './records-actions';
// const DateToday = require('../../util/date');
import  DateToday  from '../../util/date';
import { browserHistory } from 'react-router';


class RecordsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  setIdSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'id'
      }
    });
  }
  setNameSort = (mode) => {
    if (mode === '1') {
      var order = 'descend';
    }      else {
      var order = 'ascend';
    }
    this.setState({
      sortedInfo: {
        order,
        columnKey: 'patient.lname'
      }
    });
  }
  setNameSortUP = () => {
    this.setNameSort('0');
  };
  setNameSortDOWN = () => {
    this.setNameSort('1');
  };
  addRecord = () => {
    browserHistory.push('/record/add');
  };
  editRecord = (id) => {
    console.log(id);
    browserHistory.push(`/record/${id}`);
  };

  render() {
    console.log(this.state);

    let { sortedInfo, filteredInfo } = this.state;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [ {
      title: 'Номер',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order

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
      sorter: (a, b) =>  a.patient.lname.localeCompare(b.patient.lname),
      sortOrder: sortedInfo.columnKey === 'patient.lname' && sortedInfo.order
    }, {
      title: 'Имя',
      dataIndex: 'patient.fname',
      key: 'patient.fname'
    }, {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      sorter: (a, b) => a.state - b.state,
      sortOrder: sortedInfo.columnKey === 'state' && sortedInfo.order,
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
    }, {
      title: 'Action',
      key: 'action',
      width: 360,
      render: (text, record) => (
        <span>
          <Button onClick= {() => this.editRecord(record.id)}>Edit</Button>
        </span>
      )
    } ];

//          <Button onClick= {browserHistory.push(`/record/${record.id}`)}>Edit</Button>

    return (
      <div>
        <h1>RecordsList1</h1>
        <div className='table-operations'>
          <Button onClick={this.setIdSort}>Sort Id</Button>
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
          <Button onClick={this.setNameSortUP}>Sort Name UP</Button>
          <Button onClick={this.setNameSortDOWN}>Sort Name DOWN</Button>
          <Button onClick={this.addRecord}>Add record</Button>
        </div>
        <Table  rowKey='id' columns={columns} dataSource={this.props.data} onChange={this.handleChange} />
      </div>

    );
  }
}

export default connect(state => ({ data: state.records }), { getRecordsData })(RecordsList);
