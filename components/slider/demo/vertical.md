---
order: 1
title:
  zh-CN: 垂直方向
  en-US: basic usage
desc:
  zh-CN: 垂直方向
  en-US: basic pagination
---

## zh-CN

垂直方向

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Slider } from 'td-ui';

class Demo extends React.Component {
  onChange = value => {
    console.log(value)
  }
  render() {
    return (
      <div style={{ height: 300 }}>
        <div style={{ float: 'left', height: 300, marginLeft: 70 }}>
          <Slider vertical defaultValue={30} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
