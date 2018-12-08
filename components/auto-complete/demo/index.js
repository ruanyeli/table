import React from 'react';
import ReactDOM from 'react-dom';
import Basic from './basic';
import Basic2 from './basic2';
import Basic3 from './basic3';
import Basic4 from './basic4';
const MOUNT_NODE = document.getElementById('app');
let render = () => {
  function Demo() {
    return (
      <div className="td" style={{ padding: 24 }}>
        <Basic />
        <br/>
        <Basic2 />
        <br/>
        <Basic3 />
        <br/>
        <Basic4 />
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
