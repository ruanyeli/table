---
order: 2
title:
  zh-CN: 修改延时
  en-US: Type
desc:
  zh-CN: 自定义时长 10s，默认时长为 2s。
  en-US: Type
---

## zh-CN

## en-US


```jsx
import { message, Button } from 'td-ui';

ReactDOM.render(
  <div>
    <Button type="primary" onClick={ () => message.info('This is a prompt message for success, and it will disappear in 10 seconds', 10) }>duration</Button>
  </div>
, mountNode);
```
<style>
.td-btn {
  margin: 5px;
}
</style>
