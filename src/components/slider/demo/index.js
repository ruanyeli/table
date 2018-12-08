/**
 * Created by wxy on 2017/6/29.
 */

import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('app');

// showEnd 仅显示末端选项
// allowClear 是否支持清除
// hoverOpen 移入展开
let render = () => {
  let Slider = require('../index').default;
  ReactDOM.render(
    <div style={{padding: '20px'}}>
      <Slider defaultValue={30} />
      <Slider range defaultValue={[20, 50]} />
      <div style={{ height: 300 }}>
        <Slider vertical style={{ float: 'left', height: 300, marginLeft: 70 }} defaultValue={30} />
      </div>
    </div>
    , MOUNT_NODE
  );
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
