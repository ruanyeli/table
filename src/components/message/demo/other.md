---
order: 1
title:
  zh-CN: 其它类型提示
  en-US: Type
desc:
  zh-CN: 包括成功、失败、警告
  en-US: Type
---

## zh-CN


## en-US


```jsx
import { message, Button } from 'td-ui';

ReactDOM.render(
  <div>
    <Button onClick={ () => message.success('This is a message of success') }>Success</Button>
    <Button onClick={ () => message.error('This is a message of error') }>Error</Button>
    <Button onClick={ () => message.warning('This is a message of warning') }>Warning</Button>    
  </div>,
  mountNode
);
```
<style>
.td-btn {
  margin: 5px;
}
</style>
