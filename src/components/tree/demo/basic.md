---
order: 0
title:
  zh-CN: 基本用法
  en-US: basic usage
desc:
  zh-CN: 最简单的用法，展示可勾选，可选中，禁用，默认展开等功能。
  en-US: basic pagination
---

## zh-CN

最简单的用法，展示可勾选，可选中，禁用，默认展开等功能

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Tree } from 'td-ui';
const TreeNode = Tree.TreeNode;

class Demo extends React.Component {
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }
  render() {
    return (
      <Tree
        checkable
        multiple
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        defaultCheckedKeys={['0-0-0', '0-0-1']}
        onSelect={this.onSelect}
        onCheck={this.onCheck}
      >
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="parent 1-0" key="0-0-0">
            <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
            <TreeNode title="leaf" key="0-0-0-1" />
          </TreeNode>
          <TreeNode title="parent 1-1" key="0-0-1">
            <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key="0-0-1-0" />
          </TreeNode>
          <TreeNode title="parent 1-2" key="0-0-2" />
        </TreeNode>
      </Tree>
    );
  }
}


ReactDOM.render(<Demo />, mountNode);
```
