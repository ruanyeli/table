---
order: 0
title:
  zh-CN: 输入框
  en-US: Type
desc:
  zh-CN: 基本语法
  en-US: Type
---

## zh-CN
添加 defaultValue 属性即可设置数字输入框默认值，min设置最小数值，max设置最大数值。

## en-US

```jsx
import { InputNumber } from 'td-ui';

class Demo extends React.Component {
  constructor(props) {
    super()
    this.state = {
      value: 3
    }
  }

  onChange = value => {
    console.log(value);
    this.setState({value})
  }

  render() {
    return <div>
      <InputNumber onChange={this.onChange} min={1} max={10} defaultValue={this.state.value} />
    </div>;
  }
}

ReactDOM.render(
  <div>
    <Demo />
  </div>,
  mountNode
);
```
