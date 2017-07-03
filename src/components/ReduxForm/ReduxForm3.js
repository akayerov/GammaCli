import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import { load as loadAccount } from './account';
import { getRecord } from '../Record/record-actions';


let InitializeFromStateForm = props => {
  const { handleSubmit, getRecord, pristine, reset, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type='button' onClick={() => getRecord(122)}>Load Account</button>
      </div>

      <div>
        <label>First Name</label>
        <div>
          <Field name='id' component='input' type='text' placeholder='id'/>
        </div>
      </div>
      <div>
        <button type='submit' disabled={pristine || submitting}>Submit</button>
        <button type='button' disabled={pristine || submitting} onClick={reset}>Undo Changes</button>
      </div>
    </form>
  );
};

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
