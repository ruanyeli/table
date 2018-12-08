import React from 'react';
import ReactDOM from 'react-dom';
import Basic from './basic';
import ShowSearch from './showSearch';
import Group from './group';
import Combobox from './combobox';
import Multiple from './multiple';
import IsPage from './isPage';
import AllowClear from './allowClear';
const MOUNT_NODE = document.getElementById('app');
let render = () => {
  function Demo() {
    return (
      <div className="td"  style={{ paddingLeft: 30 }}>
        <Basic />
        <p>我是分隔线我是分隔线我是分隔线我是分隔线我是分隔线</p>
        <ShowSearch />
        <p>我是分隔线我是分隔线我是分隔线我是分隔线我是分隔线</p>
        <Group />
        <p>combobox模式</p>
        <Combobox />
        <p>我是分隔线我是分隔线我是分隔线我是分隔线我是分隔线</p>
        <Multiple />
        <IsPage />
        <br/>
        <AllowClear />
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
