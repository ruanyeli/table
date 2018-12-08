---
order: 0
title:
  zh-CN: 普通通知提醒
  en-US: Type
desc:
  zh-CN: 通知提醒框，将在默认时间4.5s后关闭
  en-US: Type
---

## zh-CN

常规通知提醒框

```jsx
import { notification, Button } from 'td-ui';

const showNormal = () => {
  notification.open({
    message: <span>普通通知提醒</span>,
    description:  <span>普通通知提醒框，将在默认时间4.5s后关闭</span>,
  })
}

ReactDOM.render(
  <div>
    <Button type="primary" onClick={showNormal}>normal</Button>
  </div>
, mountNode);
```