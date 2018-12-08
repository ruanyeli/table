---
order: 5
title:
  zh-CN: 受控
  en-US: basic usage
desc:
  zh-CN: 受控制的页码
  en-US: basic pagination
---

## zh-CN

受控制的页码

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Pagination } from 'td-ui';

class Demo extends React.Component {
  state = {
    current: 3
  }
  onChange = (page) => {
    console.log(page);
    this.setState({
      current: page
    });
  }
  render() {
    return <Pagination current={this.state.current} onChange={this.onChange} total={50} />;
  }
}

ReactDOM.render(<Demo />, mountNode);
```
