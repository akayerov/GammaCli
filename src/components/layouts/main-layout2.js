import { default as React,  Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
// import 'antd/dist/antd.css';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import LoginModal from '../LoginModal';
import store from '../../store';

function displayName() {
//  console.log(store.getState().auth.displayname);
  return store.getState().auth.displayname;
//  return this.props.displayname;
}


class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayname:  displayName(),
      collapsed: false,
      mode: 'inline'
    };
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline'
    });
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
          <Menu theme='dark' mode={this.state.mode} defaultSelectedKeys={[ '6' ]}>
            <SubMenu
              key='sub1'
              title={<span><Icon type='user' /><span className='nav-text'>User</span></span>}
            >
              <Menu.Item key='1'>Tom</Menu.Item>
              <Menu.Item key='2'>Bill</Menu.Item>
              <Menu.Item key='3'>Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key='sub2'
              title={<span><Icon type='team' /><span className='nav-text'>Team</span></span>}
            >
              <Menu.Item key='4'>Team 1</Menu.Item>
              <Menu.Item key='5'>Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key='6'>
              <span>
                <Icon type='file' />
                <span className='nav-text'>File</span>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <div className='header' style={{ background: '#5ff', minHeight: 36 }} >
            <h4>Gamma v 0.1</h4>
            <Link to='/private'>Private path</Link>
            <div style={{ float: 'right' }}>
              <LoginModal  displayname={this.props.displayname} />
            </div>
          </div>
          <Content style={{ margin: '0 16px', overflow: 'initial' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
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
