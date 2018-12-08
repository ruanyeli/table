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
import { Rate } from 'td-ui';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Rate className='rate'/>
        <Rate status='REVIEW' score={30} className='rate'/>
        <Rate status='REJECT' score={80} className='rate'/>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

```css
.rate {
  margin-right: 20px;
}
```
