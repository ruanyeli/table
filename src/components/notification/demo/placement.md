---
order: 1
title:
  zh-CN: 设置通知提醒的弹出位置
  en-US: Type
desc:
  zh-CN: 通知提醒可选择topLeft、topRight、bottomLeft、bottomRight四种弹出位置，默认是使用 topRight。
  en-US: Type
---

## zh-CN

设置弹出位置

```jsx
import { Button, Select, notification } from 'td-ui';

const { Option } = Select;
const options = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
const openNotification = () => {
  notification.open({
    message: "消息通知标题",
    description: "通知内容，弹出位置可以设置为从右上角、右下角、左下角、左上角弹出。",
  });
};

ReactDOM.render(
  <div>
    <Select
      defaultValue="topRight"
      style={{ width: 120, marginRight: 10 }}
      onChange={(val) => {
        notification.config({
          placement: val,
        });
      }}
    >
      {options.map(val => <Option key={val} value={val}>{val}</Option>)}
    </Select>
    <Button
      type="primary"
      onClick={openNotification}
    >
      Open the notification box
    </Button>
  </div>,
  mountNode);
```