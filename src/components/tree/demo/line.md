---
order: 3
title:
  zh-CN: 连接线
  en-US: basic usage
desc:
  zh-CN: 带连接线的树。
  en-US: basic pagination
---

## zh-CN

带连接线的树。

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Tree } from 'td-ui';
const TreeNode = Tree.TreeNode;

class Demo extends React.Component {
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  render() {
    return (
      <Tree
        showLine
        defaultExpandedKeys={['0-0-0']}
        onSelect={this.onSelect}
        checkable
      >
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="parent 1-0" key="0-0-0">
            <TreeNode title="leaf" key="0-0-0-0" />
            <TreeNode title="leaf" key="0-0-0-1" />
            <TreeNode title="leaf" key="0-0-0-2" />
          </TreeNode>
          <TreeNode title="parent 1-1" key="0-0-1">
            <TreeNode title="leaf" key="0-0-1-0" />
          </TreeNode>
          <TreeNode title="parent 1-2" key="0-0-2">
            <TreeNode title="leaf" key="0-0-2-0" />
            <TreeNode title="leaf" key="0-0-2-1" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
