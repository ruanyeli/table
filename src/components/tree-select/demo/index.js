
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import Basic from './basic';
import Multi from './multi';
// import Control from './control';
// import LoadData from './loadData';
// import Line from './line';
// import Drag from './drag';
// import Select from '../../select';
import TreeSelect from '../index';

const TreeNode = TreeSelect.TreeNode;

const MOUNT_NODE = document.getElementById('app');

// let Tree = require('../index').default;
// let TreeNode = Tree.TreeNode;
const treeData = [{
  title: 'Node1',
  value: '0-0',
  key: '0-0',
  children: [{
    title: 'Child Node1',
    value: '0-0-1',
    key: '0-0-1',
  }, {
    title: 'Child Node2',
    value: '0-0-2',
    key: '0-0-2',
  }],
}, {
  title: 'Node2',
  value: '0-1',
  key: '0-1',
}];

let render = () => {
  /* eslint-disable no-unused-vars */
  function Demo() {
    return (
      <div className="td"  style={{ paddingLeft: 30 }}>
        <p>基本</p>
        <div style={{ paddingTop: 30 }}><Basic /></div>
        <div style={{ paddingTop: 30 }}>
        <TreeSelect
          treeData={treeData}
          showSearch
          style={{ width: 300 }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          size='small'
        >
        </TreeSelect>
        <TreeSelect
          treeData={treeData}
          showSearch
          style={{ width: 300 }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
        >
        </TreeSelect>
        <TreeSelect
          treeData={treeData}
          showSearch
          style={{ width: 300 }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          size='large'
        >
        </TreeSelect>
        </div>
        <div style={{ paddingTop: 30 }}>
          <Multi />
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
