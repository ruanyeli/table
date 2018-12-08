/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-13 17:42:29
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-13 17:42:33
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './demo.less';
import Menu from '../../menu';
import Icon from '../../icon';
import { Row, Col } from '../../grid';

const { SubMenu } = Menu;

const MOUNT_NODE = document.getElementById('app');

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: ['sub1'],
      selectedKeys: ['1'],
      current: 'mail'
    }
  }

  handleClick = (e) => {
    this.setState({
      current: e.key
    });
  }

  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }

  getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2']
    };
    return map[key] || [];
  }

  onSelect = (selectedKeys) => {
    this.setState({
      selectedKeys
    });
  }

  render() {
    return <div className='inline-box'>
      <Menu
        style={{ width: 240 }}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        selectedKeys={this.state.selectedKeys}
        onSelect={this.onSelect}
      >
        <Menu.Item key="2"><Icon type="calendar" />应用管理</Menu.Item>
        <Menu.Item key="3"><Icon type="setting" />机器列表</Menu.Item>
      </Menu>
    </div>
  }
}

let render = () => {
  function Demo() {
    return (
      <div className="td">
        <header id="header">
          <a id="logo">Prelude</a>
        </header>
        <div className="main-wrapper">
          <Row>
            <Col span={4}>
              <div style={{marginRight: 10}}>
                <Sidebar />
              </div>
            </Col>
            <Col span={20}></Col>
          </Row>
        </div>
      </div>
    );
  }

  ReactDOM.render(<Demo />, MOUNT_NODE);
};

try {
  render();
} catch (e) {
  console.log(e);
}

if (module.hot) {
  module.hot.accept(['../index'], () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    });
  });
}
