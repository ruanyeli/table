---
order: 7
title:
  zh-CN: 显示个数
  en-US: basic usage
desc:
  zh-CN: 通过showNum展示显示页数
  en-US: basic pagination
---

## zh-CN

通过showNum展示显示页数

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Pagination } from 'td-ui';

ReactDOM.render(<Pagination defaultCurrent={1} showNum={3} total={150} />, mountNode);
```
