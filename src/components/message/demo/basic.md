---
order: 0
title:
  zh-CN: 普通提示
  en-US: Type
desc:
  zh-CN: 信息提醒反馈。
  en-US: Type
---

## zh-CN

常规消息提示

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { message, Button } from 'td-ui';

ReactDOM.render(
  <div>
    <Button type="primary" onClick={ () => message.info('This is a normal message') }>normal</Button>
  </div>
, mountNode);
```
<style>
.td-btn {
  margin: 5px;
}
</style>
