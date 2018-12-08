---
order: 2
title:
  zh-CN: 文字
  en-US: Type
desc:
  zh-CN: 带有文字的开关
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
  <Switch onChange={handleChange} checkedChildren={'1'} unCheckedChildren={'0'}/>
  <Switch onChange={handleChange} checkedChildren={'开'} unCheckedChildren={'关'}/>
  <Switch onChange={handleChange} checkedChildren={'on'} unCheckedChildren={'off'}/>
  <Switch onChange={handleChange} checkedChildren={'on'} unCheckedChildren={'off'} disabled/>
</div>, mountNode);

```
```css
.td-switch {
  margin-right: 10px;
}
```
