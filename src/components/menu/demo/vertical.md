---
order: 2
title:
  zh-CN: 垂直菜单
  en-US: Type
desc:
  zh-CN: 子菜单是弹出的形式。
  en-US: Type
---

## zh-CN


## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Menu, Icon } from 'td-ui';

const { SubMenu, ItemGroup } = Menu;

class Demo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <Menu
        style={{ width: 240, border: '1px solid #eee' }}
        mode="vertical"
      s>
        <SubMenu title={<span><Icon type="search" /><span>Navigation One</span></span>}>
          <ItemGroup title="Item 1">
            <Menu.Item>Option 1</Menu.Item>
            <Menu.Item>Option 2</Menu.Item>
          </ItemGroup>
          <ItemGroup title="Iteom 2">
            <Menu.Item>Option 3</Menu.Item>
            <Menu.Item>Option 4</Menu.Item>
          </ItemGroup>
        </SubMenu>
        <SubMenu title={<span><Icon type="search" /><span>Navigation Two</span></span>}>
          <Menu.Item>Option 5</Menu.Item>
          <Menu.Item>Option 6</Menu.Item>
          <SubMenu title="Submenu">
            <Menu.Item>Option 7</Menu.Item>
            <Menu.Item>Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu title={<span><Icon type="search" /><span>Navigation Three</span></span>}>
          <Menu.Item>Option 9</Menu.Item>
          <Menu.Item>Option 10</Menu.Item>
          <Menu.Item>Option 11</Menu.Item>
          <Menu.Item>Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  }
}

ReactDOM.render(<Demo />, mountNode);
```
