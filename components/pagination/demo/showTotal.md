---
order: 6
title:
  zh-CN: 总数
  en-US: basic usage
desc:
  zh-CN: 通过showTotal展示总共有多少数据
  en-US: basic pagination
---

## zh-CN

迷你版本

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Pagination } from 'td-ui';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Pagination
          total={85}
          showTotal={total => `Total ${total} items`}
          pageSize={20}
          defaultCurrent={1}
        />
        <br />
        <Pagination
          total={85}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          pageSize={20}
          defaultCurrent={1}
        />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
