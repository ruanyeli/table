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

添加 disabled 属性即可让输入框处于不可用状态，同时样式也会改变。

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Input } from 'td-ui';

ReactDOM.render(
  <Input disabled style={{width: 200}}/>,
  mountNode
);
```
