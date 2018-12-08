import React from 'react';
import TreeSelect from '../index';

const TreeNode = TreeSelect.TreeNode;

export default class Basic extends React.Component {
  state = {
    value: undefined,
  }

  onChange = (value, label, extra) => {
    console.log(value, label, extra);
    this.setState({ value });
  }
  render() {
    return (
      <TreeSelect
        showSearch
        searchPlaceholder='关键字'
        style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        treeCheckable
        multiple={true}
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
      </TreeSelect>
    );
  }
}
