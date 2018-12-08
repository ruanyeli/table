---
order: 4
title:
  zh-CN: 迷你
  en-US: basic usage
desc:
  zh-CN: 迷你版本
  en-US: basic pagination
---

## zh-CN

迷你版本

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Pagination } from 'td-ui';

function showTotal(total, range) {
  return `一共${total}条记录,当前显示第${range[0]}至${range[1]}条记录`;
}

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Pagination size="small" total={50}/>
        <Pagination size="small" total={50} showSizeChanger showQuickJumper showTotal={showTotal} />

      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

```css
.td-pagination {
  margin-bottom: 10px;
}
```
