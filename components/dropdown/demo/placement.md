---
order: 2
title:
  zh-CN: 弹出位置
  en-US: Placement
desc:
  zh-CN: 支持 6 个弹出位置。
  en-US: Type
---

## zh-CN

## en-US

Support 6 placements.

````jsx
import { Menu, Dropdown, Button } from 'td-ui';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3d menu item</a>
    </Menu.Item>
  </Menu>
);

ReactDOM.render(
  <div>
    <Dropdown overlay={menu} placement="bottomLeft">
      <Button style={{marginRight: 15}}>bottomLeft</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="bottomCenter">
      <Button style={{marginRight: 15}}>bottomCenter</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="bottomRight">
      <Button style={{marginRight: 15}}>bottomRight</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="topLeft">
      <Button style={{marginRight: 15}}>topLeft</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="topCenter">
      <Button style={{marginRight: 15}}>topCenter</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="topRight">
      <Button style={{marginRight: 15}}>topRight</Button>
    </Dropdown>
  </div>
, mountNode);
````
