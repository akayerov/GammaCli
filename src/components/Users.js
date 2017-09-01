const conf = require('../../conf');

import React from 'react';
// const fetch = require('node-fetch');


class Users extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    let status;


//    fetch('http://localhost:3000/users', {
    fetch(`${conf.url  }/users`, {
      method: 'GET'
//      headers: {
//        'Connection'  :	'keep-alive'
//      }
    }
    ).then((res) => {
      const status = res.status;


      console.log(res);
      if (status === 200) {
        console.log('Доступ разрешен');
      }  else if (status === 403) {
        console.log('Доступ запрещен');
      }
      return res.json();
    }).then((json) => {
      console.log(json);
    });
  }

  render() {
    return (
      <div className='home-page'>
        <h1>users</h1>
      </div>
    );
  }
}

export default Users;
