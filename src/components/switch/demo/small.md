---
order: 1
title:
  zh-CN: 两种大小
  en-US: Type
desc:
  zh-CN: 小开关。
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
  <Switch onChange={handleChange} checkedChildren={'开'} unCheckedChildren={'关'}/>
  <Switch onChange={handleChange} checkedChildren={'开'} unCheckedChildren={'关'} size="small"/>
</div>, mountNode);
```
