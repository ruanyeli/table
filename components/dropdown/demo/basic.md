---
order: 0
title:
  zh-CN: 基础用法
  en-US: Type
desc:
  zh-CN: 最简单的下拉菜单。
  en-US: Type
---

## zh-CN

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
      <Dropdown overlay={menu} visible={this.state.visible} onVisibleChange={(b) => {
        console.log(b);
        this.setState({
          visible: b
        });
      }}>
        <Button type='primary'>按钮按钮</Button>
      </Dropdown>
    </div>
  }
}

ReactDOM.render(<Demo />, mountNode);
```
