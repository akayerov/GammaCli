import  React from 'react';
import { connect } from 'react-redux';
import { Input,  Icon, Modal, Button } from 'antd';
import { handleLogin } from '../actions/auth-actions';
import { browserHistory } from 'react-router';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      username: '',
      password:''
    };
  }

//  state = { visible: false }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false
    });
  }


  handleOk = (e) => {
    console.log(e);
//    this.funcPost();
    fetch('http://localhost:3000/login', {
      method: 'POST',
      content_type: 'application/x-www-form-urlencoded',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `username=${  this.state.username  }&password=${  this.state.password}`
    }).then((res) => {
      if (res.status == 200) {
        this.setState({
          visible: false
        });
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
  handleShowModal = () => {
    this.setState({
      visible: true
    });
  }
  handleLogout = () => {
    browserHistory.push('/logout');
//    window.location = '/logout';
  }

  handleChange = (e) => {
    this.setState({
      username: e.target.value
    });
    console.log(this.state.username);
  };
  handleChange1 = (e) => {
    this.setState({
      password: e.target.value
    });
//    console.log(this.state.password);
  };

  render() {
    return (
      <div>
        <span style={{ marginRight: '10px' }}>
          {this.props.displayname}
        </span>
        {this.props.displayname === '' | this.props.displayname == null ? (
          <Button type='primary' onClick={this.handleShowModal}>Вход</Button>
        ) : (
          <Button type='primary' onClick={this.handleLogout}>Выход</Button>
        )}
        <Modal title='' visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <p>Пользователь</p>
          <Input id='name' onChange={this.handleChange}  placeholder='Username' />
          <p>Пароль</p>
          <Input id='password'onChange={this.handleChange1}  type='password' placeholder='Password'  />
        </Modal>
      </div>
    );
  }
}

export default connect(null, { handleLogin })(LoginModal);
