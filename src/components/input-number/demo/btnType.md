---
order: 4
title:
  zh-CN: 按钮类型
  en-US: Type
desc:
  zh-CN: 设置上下按钮类型
  en-US: Type
---

## zh-CN

通过设置 btnType 为 `vertical`, `crosswise` 分别把按钮类型设置为垂直、水平。 若不设置 btnType，默认为 `vertical`。

## en-US


```jsx
import { InputNumber } from 'td-ui';

class InputBtnType extends React.Component {
  render() {
    return (
      <div>
        <InputNumber min={1} max={10} defaultValue={3} />
        <InputNumber min={1} max={10} defaultValue={3} btnType="crosswise" style={{marginLeft: 10}}/>
      </div>
    );
  }
}

ReactDOM.render(<InputBtnType />, mountNode);
```
