import  React from 'react';
import { browserHistory } from 'react-router';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { handleLogin } from '../actions/auth-actions';
import { connect } from 'react-redux';


const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        fetch('http://localhost:3000/login', {
          method: 'POST',
          content_type: 'application/x-www-form-urlencoded',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: `username=${  values.userName  }&password=${  values.password}`
        }).then((res) => {
          if (res.status == 200) {
            browserHistory.push('/');
          }      else if (res.status === 403) {
            console.log('Доступ запрещен');
          }
          return res.json();
        }).then((json) => {
          if (!json.success) {
            throw new Error(json.error || 'unknown server error');
          }
          this.props.handleLogin(json);
        })
        .catch(err => alert(err.message || err));
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [ { required: true, message: 'Please input your username!' } ]
          })(
            <Input prefix={<Icon type='user' style={{ fontSize: 13 }} />} placeholder='Username' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [ { required: true, message: 'Please input your Password!' } ]
          })(
            <Input prefix={<Icon type='lock' style={{ fontSize: 13 }} />} type='password' placeholder='Password' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className='login-form-forgot' href=''>Forgot password</a>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Log in
          </Button>
          Or <a href=''>register now!</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

// export default WrappedNormalLoginForm;
export default connect(null, { handleLogin })(WrappedNormalLoginForm);
