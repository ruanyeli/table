---
order: 1
title:
  zh-CN: 图标按钮
  en-US: Type
desc:
  zh-CN: 支持的图标类型见Icon组件
  en-US: Type
---

## zh-CN

当需要在 Button 内嵌入 Icon 时，可以设置 icon 属性，或者直接在 Button 内使用 Icon 组件。
如果想控制 Icon 具体的位置，只能直接使用 Icon 组件，而非 icon 属性。

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Button } from 'td-ui';

ReactDOM.render(
  <div>
    <Button type="primary" icon="search">Search</Button>
    <Button icon="search">Search</Button>
    <Button icon="search"></Button>
  </div>,
  mountNode
);
```
<style>
.td-btn {
  margin: 5px;
}
</style>
