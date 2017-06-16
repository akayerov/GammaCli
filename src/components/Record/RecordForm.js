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
    this.state = {
      addRecord : false,
      changed: false
    };
  }

  componentDidMount() {
    console.log('Params:', this.props.params);
    if (this.props.params.id !== 'add') {
      this.setState({ addRecord: false });
    }    else {
      this.props.getPatSelList();
      this.setState({ addRecord: true });
    }
    this.props.getRecord(this.props.params.id);
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
    this.setState({ changed : true });
  }

  handlePatientChange =(field, value, obj) => {
    console.log('handlePatientChange: ', field, value, obj);
    const newObj = {};

    Object.assign(newObj, obj);
    newObj[field] = value;
    console.log('newObj', newObj);

    this.props.setFormField('patObj', newObj);
    this.setState({ changed : true });
  }

  handlePatientDataChange(field, momentObj, dateString, obj) {
    console.log('Selected Time: ', momentObj);
    console.log('Formatted Selected Time: ', dateString);
    const newObj = {};

    Object.assign(newObj, obj);
    newObj[field] = momentObj._d;
    console.log('newObj', newObj);

    this.props.setFormField('patObj', newObj);
    this.setState({ changed : true });
  }


  onOk(value) {
    console.log('onOk: ', value);
  }
  enterSave() {
    console.log('Press Save');
    this.props.updateRecord(this.state.addRecord);
//    this.props.getRecord(this.props.params.id); Асинхронная загрузка не всегда добро, может выполниться раньше строки выше и тогда выйдут старые данные
    this.setState({ changed : false });
  }

  enterToList() {
    browserHistory.push('/records');
  }


  render() {
//    const { data } = this.props;
    const  data  = this.props.data;
    const  pat = this.props.patlist;
    const  patName =  this.props.selForm.patient;
    const  dateRec =  this.props.selForm.date_rec.value;
    const  dateEnd =  this.props.selForm.date_end.value;
    const  patObj =   this.props.selForm.patObj.value;
    const  dateBD  =  this.props.selForm.patObj.value.date_b;
    let  dateFact =  this.props.selForm.date_fact.value;
// незаполненные поля даты

    if (dateFact != '') dateFact = moment(DateLocale(dateFact), dateFormat);
    console.log('dateFact', dateFact);

    console.log('data', data);
    console.log('patName', patName);
    console.log('patObj', patObj);
// пример работающего Select и др
/*
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
    <Input value={displayName(data)} />
    <Input value={inputTest} onChange={this.handleInTestChange} />
    <Input value={patName.key} />
    <Input value={patName.label} />

*/
/*
<DatePicker
  format='DD-MM-YYYY'
  placeholder='Выберите дату'
  onChange={(momentObj, dateString) => this.onDateRecChange('date_fact', momentObj, dateString)}
  format={dateFormat}
  value={moment(DateLocale(dateFact), dateFormat)}
  onOk={this.onOk}
/>

*/
    return (

      <div>
        <h1>RecordsForm</h1>
        <Input value={data.id} disabled />
        Сведения о пациенте
        <Input value={patObj.id}  disabled />
        <Input value={patObj.lname} onChange={(e) => this.handlePatientChange('lname', e.target.value, patObj)} />
        <Input value={patObj.fname} onChange={(e) => this.handlePatientChange('fname', e.target.value, patObj)} />
        <Input value={patObj.sname} onChange={(e) => this.handlePatientChange('sname', e.target.value, patObj)} />
        <DatePicker
          format='DD-MM-YYYY'
          placeholder='Выберите дату'
          onChange={(momentObj, dateString) => this.handlePatientDataChange('date_b', momentObj, dateString, patObj)}
          format={dateFormat}
          value={moment(DateLocale(dateBD), dateFormat)}
          onOk={this.onOk}
        />
        <Input value={patObj.city} onChange={(e) => this.handlePatientChange('city', e.target.value, patObj)} />
        <Input value={patObj.street} onChange={(e) => this.handlePatientChange('street', e.target.value, patObj)} />
        <Input value={patObj.house} onChange={(e) => this.handlePatientChange('house', e.target.value, patObj)} />
        <Input value={patObj.kvart} onChange={(e) => this.handlePatientChange('kvart', e.target.value, patObj)} />
        Конец сведения о пациенте
        Дата записи
        <DatePicker
          format='DD-MM-YYYY'
          placeholder='Выберите дату'
          onChange={(momentObj, dateString) => this.onDateRecChange('date_rec', momentObj, dateString)}
          format={dateFormat}
          value={moment(DateLocale(dateRec), dateFormat)}
          onOk={this.onOk}
        />
        Дата контрольная
        <DatePicker
          format='DD-MM-YYYY'
          placeholder='Выберите дату'
          onChange={(momentObj, dateString) => this.onDateRecChange('date_end', momentObj, dateString)}
          format={dateFormat}
          value={moment(DateLocale(dateEnd), dateFormat)}
          onOk={this.onOk}
        />
        Дата фактического поступления
        <DatePicker
          format='DD-MM-YYYY'
          placeholder='Выберите дату'
          onChange={(momentObj, dateString) => this.onDateRecChange('date_fact', momentObj, dateString)}
          format={dateFormat}
          value={dateFact}
          onOk={this.onOk}
        />
        Состояние записи
        <Input value={data.state} />
        IdMO
        <Input value={data.moId} />
        <Button type='primary'
          disabled = {!this.state.changed}
          onClick={() => this.enterSave()}
        >
           Save
        </Button>
        <Button type='secondary'
          onClick={() => this.enterToList()}
        >
          To List
        </Button>

      </div>

    );
  }
}

export default connect(state => ({ data: state.record, patlist: state.palSelList, selForm:state.selectForm }),
      { getRecord, getPatSelList, setFormField, updateRecord })(RecordsForm);
