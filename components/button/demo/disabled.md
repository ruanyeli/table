---
order: 3
title:
  zh-CN: 不可用状态
  en-US: Type
desc:
  zh-CN: 使按钮处于不可用状态
  en-US: Type
---

## zh-CN

添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变。

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Button } from 'td-ui';

ReactDOM.render(
  <div>
    <Button type="primary">Primary</Button>
    <Button type="primary" disabled>Primary(disabled)</Button>
    <br />
    <Button>Default</Button>
    <Button disabled>Default(disabled)</Button>
  </div>,
  mountNode
);
```
<style>
.td-btn {
  margin: 5px;
}
</style>
