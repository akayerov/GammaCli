import React, { Component } from 'react';
import { Table, Button, Icon } from 'antd';

const data = [ {
  key: '1',
  name: 'Антонов',
  age: 32,
  address: 'New York No. 1 Lake Park'
}, {
  key: '2',
  name: 'Аб',
  age: 32,
  address: 'New York No. 1 Lake Park'
}, {
  key: '3',
  name: 'Иванов',
  age: 42,
  address: 'London No. 1 Lake Park'
}, {
  key: '4',
  name: 'Бахвалов',
  age: 32,
  address: 'Sidney No. 1 Lake Park'
}, {
  key: '5',
  name: 'Якин',
  age: 32,
  address: 'London No. 2 Lake Park'
} ];

class Home extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null
  };
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
    let { sortedInfo, filteredInfo } = this.state;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [ {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
    { text: 'Joe', value: 'Joe' },
    { text: 'Jim', value: 'Jim' }
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => {
        console.log('Sort (a,b)');
        console.log(a);
        console.log(b);
        console.log('Результат=', a.name.localeCompare(b.name));

        return a.name.localeCompare(b.name);
      },
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
    { text: 'London', value: 'London' },
    { text: 'New York', value: 'New York' }
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order
    }, {
      title: 'Action',
      key: 'action',
      width: 360,
      render: (text, record) => (
        <span>
          <a href='#'>Action 一 {record.name}</a>
          <span className='ant-divider' />
          <a href='#'>Delete</a>
          <span className='ant-divider' />
          <a href='#' className='ant-dropdown-link'>
      More actions <Icon type='down' />
          </a>
        </span>
)

    } ];

    return (
      <div>
        <div className='table-operations'>
          <Button onClick={this.setAgeSort}>Sort age</Button>
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </div>
        <Table columns={columns} dataSource={data} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Home;
