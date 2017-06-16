import React, { Component } from 'react';
import { Table, Icon, Badge, Button, Input, DatePicker, Select } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';

import { getRecord } from './record-actions';
import { getPatSelList } from '../Patients/PalSelList-actions';
import { setFormField } from '../FormRecord/FormSelect-actions';
import { updateRecord } from './recordUpdate-actions';

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
  onDateRecChange(field, momentObj, dateString) {
    console.log('Selected Time: ', momentObj);
    console.log('Formatted Selected Time: ', dateString);
    this.props.setFormField(field, momentObj._d);
  }

  handlePatientChange =(field, value, obj) => {
    console.log('handlePatientChange: ', field, value, obj);
    const newObj = {};

    Object.assign(newObj, obj);

    newObj[field] = value;
    console.log('newObj', newObj);

    this.props.setFormField('patObj', newObj);
  }

  onOk(value) {
    console.log('onOk: ', value);
  }
  enterSave() {
    console.log('Press Save');
    this.props.updateRecord();
  }
  render() {
//    const { data } = this.props;
    const  data  = this.props.data;
    const  pat = this.props.patlist;
    const  patName =  this.props.selForm.patient;
    const  dateRec =  this.props.selForm.date_rec;
    const  patObj =   this.props.selForm.patObj;
//    const  inputTest =  this.props.selForm.intest.value;
    const  inputTest =  this.props.selForm.intest.value;

    console.log('data', data);
    console.log('patName', patName);
    console.log('intest', inputTest);
    console.log('date_rec row', dateRec);
    console.log('date_rec Local', DateLocale(dateRec));
    console.log('moment', moment(DateLocale(dateRec), dateFormat));


    return (

      <div>
        <h1>RecordsForm</h1>
        <Input value={data.id} disabled />
        <Input value={patObj.id} />
        <Input value={patObj.lname} onChange={(e) => this.handlePatientChange('lname', e.target.value, patObj)} />
        <Input value={patObj.fname} onChange={(e) => this.handlePatientChange('fname', e.target.value, patObj)} />
        <Input value={patObj.sname} />
        <Input value={DateLocale(patObj.date_b)} />
        <Input value={patObj.sity} />
        <Input value={patObj.street} />
        <Input value={patObj.house} />
        <Input value={patObj.kvart} />
        <Input value={DateLocale(data.date_rec)} />
        <Input value={data.date_end} />
        <Input value={data.date_fact} />
        <Input value={data.state} />
        <Input value={data.moId} />
        <Input value={displayName(data)} />
        <DatePicker
          format='DD-MM-YYYY'
          placeholder='Выберите дату'
          onChange={(momentObj, dateString) => this.onDateRecChange('date_rec', momentObj, dateString)}
          format={dateFormat}
          value={moment(DateLocale(dateRec), dateFormat)}
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
        <Input value={patName.key} />
        <Input value={patName.label} />
        <Button type='primary' onClick={() => this.enterSave()}>
           Save
        </Button>
      </div>

    );
  }
}

export default connect(state => ({ data: state.record, patlist: state.palSelList, selForm:state.selectForm }),
      { getRecord, getPatSelList, setFormField, updateRecord })(RecordsForm);
