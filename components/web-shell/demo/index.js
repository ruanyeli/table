import React from 'react';
import ReactDOM from 'react-dom';
import WebShell from '../index';
import 'whatwg-fetch';
import Sockjs from 'sockjs-client';
const MOUNT_NODE = document.getElementById('app');

class Demo extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   pid: null
    // };

    // fetch('http://10.57.17.240:8181/terminals', {method: 'POST'}).then(res => {
    //   res.text().then(pid => this.setState({ pid }));
    // });
    this.state = {
      socket: new Sockjs('http://10.57.17.240:8182/echo')
    }
  }
  render() {
    // if (!this.state.pid) {
    //   return null;
    // }
    if (!this.state.socket) {
      return null;
    }
    return (
      // <WebShell socketURL={`ws://10.57.17.240:8181/terminals/${this.state.pid}`}/>
      <WebShell socket={this.state.socket}/>
    )
  }
}

let render = () => {
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
