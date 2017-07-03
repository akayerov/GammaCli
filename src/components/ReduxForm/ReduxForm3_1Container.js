import React, { Component } from 'react';
import RecordReduxForm3_1 from './ReduxForm3_1';


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
        <RecordReduxForm3_1  onSubmit={this.submit} {...this.props}/>
      </div>
    );
  }
}
export default SimpleForm;
