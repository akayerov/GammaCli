import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import { load as loadAccount } from './account';
import { getRecord } from '../Record/record-actions';
import {  DatePicker } from 'antd';
import moment from 'moment';
import  DateLocale  from '../../util/dateloc';


const dateFormat = 'DD/MM/YYYY';

const tooOld = value =>
  value && value < '2016-05-31' ? 'To more old date' : undefined;

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
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);
const onOk = (value) => {
  console.log('onOk: ', value);
};

const handleDataChange = (momentObj, input) => {
  console.log('Selected Time: ', momentObj);
  input.onChange(momentObj._d);
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

class InitializeFromStateForm extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('Params:', this.props.params);
    this.props.getRecord(this.props.params.id);
  }

  render() {
    const { handleSubmit, getRecord, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>id</label>
          <div>
            <Field name='id' component='input' type='text' placeholder='id'/>
          </div>
          <label>Дата Нач</label>
          <div>
            <Field name='date_rec' component={renderDateField} type='text' placeholder='' warn={tooOld} />

          </div>
          <label>Фамилия</label>
          <div>
            <Field name='patient.lname' component='input' type='text' placeholder='Фамилия'/>
          </div>
          <label>Имя</label>
          <div>
            <Field name='patient.fname' component='input' type='text' placeholder='Имя'/>
          </div>
          <label>Отчество</label>
          <div>
            <Field name='patient.sname' component='input' type='text' placeholder='Отчество'/>
          </div>
        </div>
        <div>
          <button type='submit' disabled={pristine || submitting}>Submit</button>
          <button type='button' disabled={pristine || submitting} onClick={reset}>Undo Changes</button>
        </div>
      </form>
    );
  }
}
// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
  form: 'initFromState'  // a unique identifier for this form
})(InitializeFromStateForm);

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
  state => ({
    initialValues: state.record // pull initial values from account reducer
  }),
  { getRecord }               // bind account loading action creator
)(InitializeFromStateForm);

export default InitializeFromStateForm;
