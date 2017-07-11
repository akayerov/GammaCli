import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import { load as loadAccount } from './account';
// import { getRecord } from '../Record/record-actions';
//! !!! Тест
import { getRecord } from './record-actionsReduxForm';
import {  DatePicker, Button, Icon, message } from 'antd';

import moment from 'moment';
import  DateLocale  from '../../util/dateloc';
import { browserHistory } from 'react-router';


const dateFormat = 'DD/MM/YYYY';

const tooOld = value =>
  value && value < '2016-05-31' ? 'To more old date' : undefined;

const required = value => (value ? undefined : 'Обязательное поле');
/*
<div>
  message.error('Форма не может быть сохранена. Исправьте ошибки!');
</div>
*/
const failSubmit = (errors) => (
//  message.success('Click on Yes')
    message.error('Исправьте ошибки ввода до сохранения')
);

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span><Icon type='question-circle'  style={{ fontSize: 16, color: '#08c' }} /> {error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);
const onOk = (value) => {
  console.log('onOk: ', value);
};

const handleDataChange = (momentObj, input) => {
  console.log('Selected Time: ', momentObj);
  if (momentObj)    {
    input.onChange(momentObj._d);
  }  else    {
    input.onChange('');
  }
};

// onChange={(momentObj, dateString) => handleDataChange(momentObj, dateString)}
// onChange={(event, value1) => input.onChange('2017-07-31')}

const renderDateField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <DatePicker
        placeholder='Выберите дату'
        format={dateFormat}
        value={moment(DateLocale(input.value), dateFormat)}
        onChange={(momentObj, dateString) => handleDataChange(momentObj, input)}
        onOk={onOk}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
  );
// Конвертирование пустых дат!
// добавлено свойство disabled
const renderDateFieldMod = ({
    input,
    label,
    type,
    meta: { touched, error, warning },
    disabled
  }) => {
  let  dateVal =  input.value;

  dateVal = moment(DateLocale(dateVal), dateFormat);
  if (dateVal._i == 'NaN/NaN/NaN') dateVal = null;
  console.log('DateVal:', dateVal);

  return (
    <div>
      <label>{label}</label>
      <div>
        <DatePicker
          disabled = {disabled}
          placeholder='Выберите дату'
          format={dateFormat}
          value={dateVal}
          onChange={(momentObj, dateString) => handleDataChange(momentObj, input)}
          onOk={onOk}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};

class InitializeFromStateForm extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getRecord(this.props.params.id);
  }
  enterToList() {
    browserHistory.push('/records');
  }
  render() {
    const { handleSubmit, getRecord, pristine, reset, submitting, onSubmit1 } = this.props;
    let modeAdd = false;

    if (this.props.params.id === 'add')      {
      modeAdd = true;
    }
    console.log('Props:', this.props);
    // права редактирования полей
    const role = this.props.user.role;
    const disabled = {};

    if (role > 0)      {
      disabled.dateFact = false;
    }    else      {
      disabled.dateFact = true;
    }
    console.log('disabled', disabled);

//    <button type='submit' disabled={pristine || submitting}>Submit</button>

    return (
      <form onSubmit={handleSubmit((value) => onSubmit1(value, modeAdd))}>
        <div>
          <label>id</label>
          <div>
            <Field name='id' component='input' type='text' placeholder='id' disabled/>
          </div>
          <label>Пациент</label>
          <label>Фамилия</label>
          <div>
            <Field name='patient.lname' component={renderField} type='text' placeholder='' validate={required}/>
          </div>
          <label>Имя</label>
          <div>
            <Field name='patient.fname' component={renderField} type='text' placeholder='' validate={required}/>
          </div>
          <label>Отчество</label>
          <div>
            <Field name='patient.sname' component={renderField} type='text' placeholder='' validate={required}/>
          </div>
          <label>Дата Рожд</label>
          <div>
            <Field name='patient.date_b' component={renderDateFieldMod} type='text' placeholder='' />
          </div>
          <label>Город (нас. пункт)</label>
          <div>
            <Field name='patient.city' component='input' type='text' placeholder='' />
          </div>
          <label>Улица</label>
          <div>
            <Field name='patient.street' component='input' type='text' placeholder='' />
          </div>
          <label>Дом</label>
          <div>
            <Field name='patient.house' component='input' type='text' placeholder='' />
          </div>
          <label>Квартира</label>
          <div>
            <Field name='patient.kvart' component='input' type='text' placeholder='' />
          </div>
          <label>Дата Записи</label>
          <div>
            <Field name='date_rec' component={renderDateFieldMod} type='text' placeholder='' warn={tooOld} />
          </div>
          <label>Дата Контрольная</label>
          <div>
            <Field name='date_end' component={renderDateFieldMod} type='text' placeholder=''/>
          </div>
          <label>Дата поступления</label>
          <div>
            <Field
              disabled = {disabled.dateFact}
              name='date_fact' component={renderDateFieldMod} type='text' placeholder=''
            />
          </div>
          <label>Состояние</label>
          <div>
            <Field name='state' component='input' type='text' placeholder='' disabled/>
          </div>
          <label>moId</label>
          <div>
            <Field name='moId'  component='input' type='text' placeholder='' disabled/>
          </div>
        </div>
        <div>
          <Button type='primary' htmlType='submit' disabled={pristine || submitting}>Submit</Button>
          <Button type='default' htmlType='button' disabled={pristine || submitting}  onClick={reset}>Undo Changes</Button>
          <Button type='default'
            onClick={() => this.enterToList()}
          >
            To List
          </Button>
        </div>
      </form>
    );
  }
}
// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
  form: 'initFromState',  // a unique identifier for this form
  enableReinitialize : { true },
  initialValues : {
    'patient.fname' : 'Вася'
  },
  onSubmitFail :  failSubmit
})(InitializeFromStateForm);

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
  state => ({
    initialValues: state.record, // pull initial values from account reducer
    user: state.auth
  }),
  { getRecord }               // bind  loading action creator
)(InitializeFromStateForm);

export default InitializeFromStateForm;
