---
order: 0
title:
  zh-CN: 顶部导航菜单
  en-US: Type
desc:
  zh-CN: 水平的顶部导航菜单。
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
    this.state = {
      current: 'mail'
    }
  }

  handleClick = (e) => {
    this.setState({
      current: e.key
    });
  }

  render() {
    return <div style={{padding: '20px 0', position: 'relative', zIndex: 100}}>
      <Menu
        style={{height: 42}}
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="mail">
          <Icon type="search" />Navigation One
        </Menu.Item>
        <SubMenu key="app" title={<span><Icon type="search" /><span>Navigation Two</span></span>}>
          <Menu.Item key="5" disabled>Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu title={<span><Icon type="search" />Navigation Three - Submenu</span>}>
          <ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </ItemGroup>
          <ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://td-ui.github.io/zh-cn/" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
        </Menu.Item>
      </Menu>
    </div>
  }
}

ReactDOM.render(<Demo />, mountNode);
```
