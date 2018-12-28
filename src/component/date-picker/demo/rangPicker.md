---
order: 2
title:
  zh-CN: 时间区间选择
  en-US: Type
desc:
  zh-CN: 时间区间选择，返回 [moment, moment]
  en-US: Type
---

## zh-CN

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { DatePicker } from 'td-ui';
const RangePicker = DatePicker.RangePicker;

ReactDOM.render(
  <div>
    <RangePicker format="YYYY-MM-DD HH:mm:ss"/>
  </div>,
  mountNode
);
```
<style>
.td-btn {
  margin: 5px;
}
</style>
