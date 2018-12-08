---
order: 1
title:
  zh-CN: 数据直接生成树结构
  en-US: Basic
---

## zh-CN

使用 treeData 把 JSON 数据直接生成树结构。

````jsx
import { TreeSelect } from 'td-ui';

const TreeNode = TreeSelect.TreeNode;

class Demo extends React.Component {
  state = {
    value: 'node1-2',
    treeData: [{
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
    }],
  }

  onChange = (value, label, extra) => {
    console.log(value, label, extra);
    this.setState({ value });
  }

  render() {
    return (
      <TreeSelect
        treeData={this.state.treeData}
        showSearch
        style={{ width: 300 }}
        defaultValue={this.state.value}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={this.onChange}
      >
      </TreeSelect>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
````
