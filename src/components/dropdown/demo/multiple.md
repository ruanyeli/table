---
order: 1
title: 
  zh-CN: 多级菜单
  en-US: Type
desc:
  zh-CN: 
  en-US: Type
---

## zh-CN

传入的菜单里有多个层级。

```jsx
import { Menu, Dropdown, Icon } from 'td-ui';
const SubMenu = Menu.SubMenu;

const menu = (
  <Menu>
    <Menu.Item>1st menu item</Menu.Item>
    <Menu.Item>2nd menu item</Menu.Item>
    <SubMenu title="sub menu 1">
      <Menu.Item>3rd menu item</Menu.Item>
      <Menu.Item>4th menu item</Menu.Item>
    </SubMenu>
    <SubMenu title="sub menu 2">
      <Menu.Item>5d menu item</Menu.Item>
      <Menu.Item>6th menu item</Menu.Item>
    </SubMenu>
  </Menu>
);

ReactDOM.render(
  <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" href="#">
      Cascading menu <Icon type="down" />
    </a>
  </Dropdown>
, mountNode);
```