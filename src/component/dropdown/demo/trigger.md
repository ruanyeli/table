---
order: 1
title:
  zh-CN: 触发方式
  en-US: Type
desc:
  zh-CN: dropdown通过配置trigger属性来设置下拉框的触发方式，支持hover、click，默认hover。
  en-US: Type
---

## zh-CN

dropdown通过配置trigger属性来设置下拉框的触发方式，支持`hover`移入触发、`click`点击触发、`contextMenu`右键触发。

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Button, Dropdown, Menu } from 'td-ui';
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a href="javascript:;" onClick={() => {
            console.log('xx')
          }}>1st menu item xxx</a>
        </Menu.Item>
        <Menu.Item>
          2st menu item xxx
        </Menu.Item>
        <Menu.Item>
          3st menu item xxx
        </Menu.Item>
      </Menu>
    )
    return <div>
      <Dropdown overlay={menu} trigger="click">
        <Button style={{marginRight: 15}}>按钮click</Button>
      </Dropdown>
      <Dropdown overlay={menu} trigger="hover">
        <Button style={{marginRight: 15}}>按钮hover</Button>
      </Dropdown>
      <Dropdown overlay={menu} trigger="contextMenu">
        <Button>按钮contextMenu</Button>
      </Dropdown>
    </div>
  }
}

ReactDOM.render(<Demo />, mountNode);
```
