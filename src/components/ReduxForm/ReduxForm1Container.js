import React, { Component } from 'react';
import RecordReduxForm2 from './ReduxForm1';


class SimpleForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit = (values) => {
    console.log('Submit Now!!!', values);
  };

  render()  {
    return (
      <div>
        <RecordReduxForm2  onSubmit={this.submit} />
      </div>
    );
  }
}
export default SimpleForm;
