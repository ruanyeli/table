---
order: 0
title:
  zh-CN: 基本用法
  en-US: basic usage
desc:
  zh-CN: 基础
  en-US: basic pagination
---

## zh-CN

基础

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Slider } from 'td-ui';

class Demo extends React.Component {
  render() {
    return (
      <div style={{paddingTop: 20}}>
        <Slider defaultValue={30} />
        <Slider range defaultValue={[20, 50]} />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
