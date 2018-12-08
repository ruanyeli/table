---
order: 0
title:
  zh-CN: 输入框类型
  en-US: Type
desc:
  zh-CN: 基本语法
  en-US: Type
---

## zh-CN
添加 defaultValue 属性即可设置输入框默认值。

## en-US

```jsx
import { Input } from 'td-ui';
ReactDOM.render(
  <div>
    <Input placeholder="placeholder" style={{width: 150}}/>  <Input defaultValue="我是默认值" style={{width: 150}}/>
  </div>,
  mountNode
);
```
