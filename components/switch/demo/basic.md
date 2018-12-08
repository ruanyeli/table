---
order: 0
title:
  zh-CN: 基础用法
  en-US: Type
desc:
  zh-CN: 简单的开关。
  en-US: Type
---

## zh-CN



## en-US

```jsx
import { Switch } from 'td-ui';

function handleChange(bool) {
    console.log(bool);
}

ReactDOM.render(
<div>
  <Switch onChange={handleChange} value={true} size="default" checkedChildren="开" unCheckedChildren="关"/>
  <Switch disabled value={true} checkedChildren="开" unCheckedChildren="关"/>
</div>, mountNode);
```
```css
.td-switch {
  margin-right: 10px;
}
```
