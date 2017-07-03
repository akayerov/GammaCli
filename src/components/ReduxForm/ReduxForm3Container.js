import React, { Component } from 'react';
import RecordReduxForm3 from './ReduxForm3';


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
        <RecordReduxForm3  onSubmit={this.submit} />
      </div>
    );
  }
}
export default SimpleForm;
