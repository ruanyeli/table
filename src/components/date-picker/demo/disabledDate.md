---
order: 3
title:
  zh-CN: 不可选择日期和时间
  en-US: Type
desc:
  zh-CN: 可用 disabledDate 禁止选择部分日期和时间。
  en-US: Type
---

## zh-CN

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { DatePicker } from 'td-ui';
const RangePicker = DatePicker.RangePicker;

const disabledDate = (time) => {
  return time && time.valueOf() > Date.now();
}

ReactDOM.render(
  <div>
    <RangePicker disabledDate={disabledDate} format="YYYY-MM-DD HH:mm:ss"/>
  </div>,
  mountNode
);
```
<style>
.td-btn {
  margin: 5px;
}
</style>
