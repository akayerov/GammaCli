import { default as React,  Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
// import 'antd/dist/antd.css';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import LoginModal from '../LoginModal';
import store from '../../store';

// <Link to='/private'>Private path</Link>
/*
function displayName() {
//  console.log(store.getState().auth.displayname);
  return store.getState().auth.displayname;
//  return this.props.displayname;
}
*/

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
//      displayname:  displayName(),
      collapsed: false,
      mode: 'inline',
      current: '1'
    };
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline'
    });
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
    if (e.key === '1') {
      console.log('Тест');
      browserHistory.push('/table1');
    } else if (e.key === '2') {
      console.log('RecordList');
      browserHistory.push('/records');
    }
  }

  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className='logo' />
          <Menu theme='dark' mode={this.state.mode}
            onClick={this.handleClick}
            defaultOpenKeys={[ 'sub1' ]}
            selectedKeys={[ this.state.current ]}
            mode={this.state.mode}
            defaultSelectedKeys={[ '6' ]}

          >
            <SubMenu
              key='sub1'
              title={<span><Icon type='file' /><span className='nav-text'>Документы</span></span>}
            >
              <Menu.Item key='2'>Список направлений</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <div className='header' style={{ background: '#f7629e', minHeight: 48 }} >
            <h4>Гамма v 0.1</h4>
            <div style={{ float: 'right' }}>
              <LoginModal  displayname={this.props.displayname} />
            </div>
          </div>
          <Content style={{ margin: '1 1px', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ОЦМП ЯО ©2017 Created by Kayerov A
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const layoutStateToProps = function (store) {
  return {
    displayname: store.auth.displayname
  };
};

const layoutDispatchToActions = {
};

export default connect(
  layoutStateToProps,
  layoutDispatchToActions // для этого передаем объект в коннект вторым аргументом
)(MainLayout);

// export default MainLayout;
