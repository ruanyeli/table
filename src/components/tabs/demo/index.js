import React from 'react';
import ReactDOM from 'react-dom';
import Basic from './basic';
import Editable from './editable';
import Remove from './remove';
import Disable from './disable';
import Scroll from './scroll';
import Card from './card';
import Position from './position';
const MOUNT_NODE = document.getElementById('app');

let render = () => {
  /* eslint-disable no-unused-vars */
  /* eslint-disable no-unused-vars */
  function Demo() {
    return (
      <div style={{margin: '20px auto', padding: 30}}>
        <div className="td" style={{padding: 30}}>
          <Basic />
          <Remove />
          <Disable />
          <Scroll />
          <Card />
          <Position />
          <Editable/>
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
