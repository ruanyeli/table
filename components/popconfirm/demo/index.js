/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../../button'

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  let Popconfirm = require('../index').default;

  function Demo() {
    return (
      <div className="demo" style={{ marginLeft: '200px', marginTop: '200px' }}>
        <Popconfirm placement="rightTop" content="确认删除吗?" onConfirm={()=>console.log('onConfirm')} onCancel={()=>console.log('onCancel')}>
          <Button type="default">删除</Button>
        </Popconfirm>
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
