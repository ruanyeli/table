import React from 'react';
import ReactDOM from 'react-dom';
import BackTop from '../index';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  function Demo() {
    return (
      <div className="td" style={{ height: 2000 }}>
        <BackTop />
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
    })
  })
}
