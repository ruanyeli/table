---
order: 2
title:
  zh-CN: 改变
  en-US: basic usage
desc:
  zh-CN: 改变每页显示条目数
  en-US: basic pagination
---

## zh-CN

改变每页显示条目数

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Pagination } from 'td-ui';

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}

ReactDOM.render(<Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={500} />, mountNode);
```
