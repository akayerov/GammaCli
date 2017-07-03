import React, { Component } from 'react';
import RecordReduxForm1 from './ReduxForm1';
import { Modal } from 'antd';
import { browserHistory } from 'react-router';


class SimpleForm extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
    this.submit = this.submit.bind(this);
  }
  submit = (values) => {
    console.log('Submit Now!!!', values);
    this.setState({
      visible: false
    });
    browserHistory.push('/records');
  };
/*
  handleOk = (e) => {
    console.log('Submit Now2!!!', e);
    this.setState({
      visible: false
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false
    });
  }
*/
  render()  {
    return (
      <Modal
        title='Basic Modal'
        visible={this.state.visible}
        footer={null}
      >
        <div>
          <RecordReduxForm1  onSubmit={this.submit} />
        </div>
      </Modal>
    );
  }
}
export default SimpleForm;
