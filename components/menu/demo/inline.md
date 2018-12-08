---
order: 1
title:
  zh-CN: 垂直内嵌在菜单
  en-US: Type
desc:
  zh-CN: 垂直菜单，子菜单内嵌在菜单区域。
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
      openKeys: ['sub1'],
      selectedKeys: ['1'],
      current: 'mail'
    }
  }

  handleClick = (e) => {
    this.setState({
      current: e.key
    });
  }

  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }

  getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2']
    };
    return map[key] || [];
  }

  onSelect = (selectedKeys) => {
    this.setState({
      selectedKeys
    });
  }

  render() {
    return <div className='inline-box'>
      <Menu
        style={{ width: 240, border: '1px solid #eee' }}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        selectedKeys={this.state.selectedKeys}
        onSelect={this.onSelect}
      >
        <SubMenu key="sub1" title={<span><Icon type="setting" /><span>Navigation One</span></span>}>
          <ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </ItemGroup>
          <ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="calendar" /><span>Navigation Two</span></span>}>
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="search" /><span>Navigation Three</span></span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  }
}

ReactDOM.render(<Demo />, mountNode);
```

````css
.inline-box{
  width: 240px;
  border: '1px solid #eee';
}
````
