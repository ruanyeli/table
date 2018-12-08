---
order: 0
title:
  zh-CN: 按钮类型
  en-US: Type
desc:
  zh-CN: 基本用法
  en-US: Type
---

## zh-CN

按钮有3种类型： 主按钮、次按钮、虚线按钮。主按钮在同一个操作区域最多出现一次。

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Button } from 'td-ui';

ReactDOM.render(
  <div>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
  </div>
, mountNode);
```
<style>
.td-btn {
  margin: 5px;
}
</style>
