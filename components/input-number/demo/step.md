---
order: 3
title:
  zh-CN: 输入框增减值
  en-US: Type
desc:
  zh-CN: 增减值设为0.1和2的情况
  en-US: Type
---

## zh-CN
添加 step 属性即可设置数字输入框增减的基数，默认值为1。

## en-US

```jsx
import { InputNumber } from 'td-ui';
ReactDOM.render(
  <div>
        <InputNumber step={0.1} min={1} max={10} defaultValue={1.1} />
        <br />
        <br />
        <InputNumber step={2} min={1} max={10} defaultValue={2} />
  </div>,
  mountNode
);
```
