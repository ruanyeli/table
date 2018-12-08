import React from 'react';
import ReactDOM from 'react-dom';

/* eslint-disable no-unused-vars */
import ErrorCatch from '../index';

const MOUNT_NODE = document.getElementById('app');

@ErrorCatch()
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleClick = () => {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }

  render() {
    if (this.state.counter === 5) {
      throw new Error('I crashed!'); 
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
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
