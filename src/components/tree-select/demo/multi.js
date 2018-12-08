import React from 'react';
import TreeSelect from '../index';

const TreeNode = TreeSelect.TreeNode;

export default class Basic extends React.Component {
  state = {
    value: undefined,
  }

  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  }
  render() {
    return (
      <TreeSelect
        // showSearch
        style={{ width: 200 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder='多选'
        allowClear
        treeDefaultExpandAll
        multiple={true}
        // treeCheckable
        onChange={this.onChange}
      >
        <TreeNode value="parent 1" title="parent 1" key="0-1">
          <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
            <TreeNode value="leaf1" title="my leaf" key="random" disabled/>
            <TreeNode value="leaf2" title="your leaf" key="random1" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
            <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
          </TreeNode>
        </TreeNode>
        <TreeNode value="parent 2" title="parent 2" key="0-2">
        </TreeNode>
        <TreeNode value="parent 3" title="parent 3" key="0-3">
        </TreeNode>
      </TreeSelect>
    );
  }
}
