/**
 * Created by wxy on 2017/6/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import options from './option';

const MOUNT_NODE = document.getElementById('app');

// showEnd 仅显示末端选项
// allowClear 是否支持清除
// hoverOpen 移入展开
function onChange(value, options) {
  console.log(value, options);
}

function onInputChange(value) {
  console.log(value);
}

const options2 = [];
for (let i = 0; i < 300; i++) {
  const data = {
    label: `label ${i}`,
    value: `${i}`
  };
  if (i % 2 === 0) {
    data.children = [{
      label: 'children 1',
      value: 'children1'
    }, {
      label: 'children 2',
      value: 'children2'
    }]
  }
  options2.push(data);
}
for (let i = 300; i < 600; i++) {
  const data = {
    label: `label ${i}`,
    value: `${i}`
  };
  options2.push(data);
}

let render = () => {
  let Cascader = require('../index').default;
  let LoadData = require('../loadData').default;
  ReactDOM.render(
    <div style={{paddingLeft: 30}}>
      <div style={{padding: '20px 0'}}>
        <Cascader options={options} onChange={onChange} dropdownColumnStyle={{width: 300}}/>
      </div>
      <div style={{padding: '20px 0'}}>
        <Cascader options={options2} onChange={onChange} onInputChange={onInputChange} showSearch isPage={{visibleCount: 10}}/>
      </div>
      <div style={{padding: '20px 0'}}>
        <LoadData />
      </div>
    </div>, MOUNT_NODE
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
