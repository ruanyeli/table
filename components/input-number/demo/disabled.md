---
order: 1
title:
  zh-CN: 不可用状态
  en-US: Type
desc:
  zh-CN: 使按钮处于不可用状态
  en-US: Type
---

## zh-CN

添加 disabled 属性即可让数字输入框处于不可用状态，同时样式也会改变。

## en-US


```jsx
import { InputNumber } from 'td-ui';

ReactDOM.render(
  <div>
    <InputNumber min={1} max={10} defaultValue={3} disabled/>
    
  </div>,
  mountNode
);
```
