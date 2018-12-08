---
order: 5
title:
  zh-CN: 按钮样式
  en-US: Type
desc:
  zh-CN: 使用type可以快速创建一个带有预定义样式的按钮。
  en-US: Type
---

## zh-CN

type可为`primary`、`danger`、`warning`三种类型，默认为`default`；

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Button, Radio, Icon } from 'td-ui';

class ButtonSize extends React.Component {
  state = {
    size: 'default',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const size = this.state.size;
    return (
      <div>
        <Button type="default">
          默认
        </Button>
        <Button type="primary">
          primary
        </Button>
        <Button type="danger">
          danger
        </Button>
        <Button type="warning">
          warning
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<ButtonSize />, mountNode);
```
```css
<style>
.td-btn {
  margin: 5px;
}
</style>
```
