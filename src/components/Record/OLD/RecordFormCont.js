import React, { Component } from 'react';
import { Table, Icon, Badge, Button, Input, DatePicker, Select } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';

import { getRecord } from './record-actions';
import { getPatSelList } from '../Patients/PalSelList-actions';
import { setFormField } from '../FormRecord/FormSelect-actions';

import  DateLocale  from '../../util/dateloc';

import  displayName  from '../../util/displayname';
import { browserHistory } from 'react-router';
const Option = Select.Option;
const dateFormat = 'DD/MM/YYYY';

class RecordsForm extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getRecord(this.props.params.id);
    this.props.getPatSelList();
  }
  handleChange =(value, option) => {
    this.props.setFormField('patient', { key: value.key, label:value.label });
  }

  handleInTestChange =(e) => {
    console.log('handleInTestChange: ', e.target.value);
    this.props.setFormField('intest', { value: e.target.value });
  }
  onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  onOk(value) {
    console.log('onOk: ', value);
  }

  render() {
//    const { data } = this.props;
    const  data  = this.props.data;
    const  pat = this.props.patlist;
    const  patName =  this.props.selForm.patient;
//    const  inputTest =  this.props.selForm.intest.value;
    const  inputTest =  this.props.selForm.intest.value;

    console.log('patName', patName);
    console.log('intest', inputTest);
    return (

      <div>
        <h1>RecordsForm</h1>
        <Input value={data.id} disabled />
        <Input value={DateLocale(data.date_rec)} />
        <Input value={data.date_end} />
        <Input value={data.date_fact} />
        <Input value={data.state} />
        <Input value={data.moId} />
        <Input value={patName.key} />
        <Input value={patName.label} />
        <Input value={displayName(data)} />
        <DatePicker
          showTime
          format='DD-MM-YYYY'
          placeholder='Выберите дату'
          onChange={this.onChange}
          onOk={this.onOk}
        />
        <Select
          showSearch
          style={{ width: 300 }}
          placeholder='Select a patient'
          optionFilterProp='children'
          onChange={this.handleChange}
          labelInValue
          filterOption={(input, option) =>  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          value = {patName}
        >
          {pat.map(d => <Option key={d.id.toString(10)}>{d.lname}</Option>)}
        </Select>
        <Input value={inputTest} onChange={this.handleInTestChange} />

      </div>

    );
  }
}

export default connect(state => ({ data: state.record, patlist: state.palSelList, selForm:state.selectForm }),
      { getRecord, getPatSelList, setFormField })(RecordsForm);
