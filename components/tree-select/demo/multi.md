---
order: 2
title:
  zh-CN: 多选模式
  en-US: Basic
---

## zh-CN

一次可以选择多个选项

````jsx
import { TreeSelect } from 'td-ui';

const TreeNode = TreeSelect.TreeNode;

class Demo extends React.Component {
  state = {
    value: null,
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
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        multiple={true}
        onChange={this.onChange}
      >
      </TreeSelect>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
````
