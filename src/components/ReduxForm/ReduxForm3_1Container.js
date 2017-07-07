import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecordReduxForm3_1 from './ReduxForm3_1';
import { updateRecordRF } from './recordUpdate-ReduxForm-action';


class SimpleForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit = (values, flagAdd) => {
    console.log('Submit Now!!! values:', values);
    console.log('Submit Now!!! flagAdd:', flagAdd);
    this.props.updateRecordRF(flagAdd, values);
  };

  render()  {
    return (
      <div>
        <RecordReduxForm3_1  onSubmit1={this.submit} {...this.props}/>
      </div>
    );
  }
}
// export default SimpleForm;
export default connect(state => ({ }),
      { updateRecordRF })(SimpleForm);
