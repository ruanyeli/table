---
order: 2
title:
  zh-CN: 控制提醒的关闭
  en-US: Type
desc:
  zh-CN: 可以将duration 设置为 0 或者 null， 通知框不会自动关闭，点击关闭图标关闭，或通过唯一key关闭该弹框。
  en-US: Type
---

## zh-CN

控制弹框关闭

```jsx
import { Button, notification } from 'td-ui';

const openNotification = () => {
  const key = `${Date.now()}`;
  const args = {
    key,
    message: 'Notification Title',
    description: "弹框不会自动关闭，点击关闭图标关闭，或通过唯一key关闭该弹框",
    // duration: 0,
    duration: null,
    btn: <Button onClick={() => notification.close(key)}>确认</Button>
  };
  notification.open(args);
};

ReactDOM.render(
  <Button type="primary" onClick={openNotification}>Open the notification box</Button>,
  mountNode);
```