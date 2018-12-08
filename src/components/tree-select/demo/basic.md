---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的用法。

## en-US

The most basic usage.

````jsx
import { TreeSelect } from 'td-ui';

const TreeNode = TreeSelect.TreeNode;

class Demo extends React.Component {
  state = {
    value: 'node1-2',
  }

  onChange = (value, label, extra) => {
    console.log(value, label, extra);
    this.setState({ value });
  }

  render() {
    return (
      <TreeSelect
        showSearch
        style={{ width: 250 }}
        defaultValue={this.state.value}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={this.onChange}
      >
        <TreeNode value="node1" title="node1" key="0-1">
          <TreeNode value="node1-1" title="node1-1" key="0-1-1">
            <TreeNode value="node1-1-1" title="node1-1 leaf" key="random" />
            <TreeNode value="node1-1-2" title="node1-1 leaf2" key="random1" />
          </TreeNode>
          <TreeNode value="node1-2" title="node1-2" key="random2">
            <TreeNode value="node1-2-1" title={<b style={{ color: '#08c' }}>node1-2-1</b>} key="random3" />
          </TreeNode>
        </TreeNode>
      </TreeSelect>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
````
