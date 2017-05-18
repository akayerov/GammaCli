import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';

import { getPrivateData } from '../actions/private-actions';

class Private extends Component {
  render() {
    const { data = [], getPrivateData } = this.props;
    return (
      <div>
        <h1>Private path</h1>
        <Button onClick={() => getPrivateData()}>Get private data</Button>
        <ul>
          {data.map(d => <li key={d.id}>{d.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default connect(state => ({ data: state.private }), { getPrivateData })(Private);
