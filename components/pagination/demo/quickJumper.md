---
order: 3
title:
  zh-CN: 跳转
  en-US: basic usage
desc:
  zh-CN: 快速跳转到某一页
  en-US: basic pagination
---

## zh-CN

快速跳转到某一页

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Pagination } from 'td-ui';

function onChange(pageNumber) {
  console.log('Page: ', pageNumber);
}

ReactDOM.render(<Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />, mountNode);
```
