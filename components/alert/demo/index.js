import React from 'react';
import ReactDOM from 'react-dom';
import Basic from './basic';
const MOUNT_NODE = document.getElementById('app');
let render = () => {
  function Demo() {
    return (
      <div className="td">
        <Basic />
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
