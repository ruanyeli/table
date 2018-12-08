---
order: 2
title:
  zh-CN: 带图标通知提醒框
  en-US: Type
desc:
  zh-CN: 默认有 success、info、warning(warn)、error 四种类型，此外也可通过 icon 配置，设置自定义图标。
  en-US: Type
---

## zh-CN

带图标

```jsx
import { Button, notification, Icon, Row } from 'td-ui';

const openNotification = (type) => {
  const args = {
    message: 'Notification Title',
    description: "带有图标状态值的提示框",
    duration: null,

  };
  notification[type](args);
};

const openIconNotification = () => {
    notification.open({
      message: 'Notification Title',
      description: "可自定义图标类型，并可以通过 style 属性控制提示框的样式",
      icon: <Icon type="like" style={{ color: '#08c' }}  />,
      duration: null,
      style: {
        width: 500,
        marginLeft: 335 - 500,
      },
    });
};

ReactDOM.render(
  <Row type="flex" justify="space-between" style={{ width: 600, background: "#fff" }}>
    <Button onClick={() => openNotification("success")}>success</Button>
    <Button onClick={() => openNotification("info")}>info</Button>
    <Button onClick={() => openNotification("warn")}>warn</Button>
    <Button onClick={() => openNotification("error")}>error</Button>
    <Button onClick={openIconNotification}>自定义icon</Button>
    <Button type="danger" onClick={() => notification.destroy()}>销毁所有提示框</Button>
  </Row>,
  mountNode);
```