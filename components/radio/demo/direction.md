---
order: 3
title:
  zh-CN: 方向
  en-US: direction
---

## zh-CN

排列方向

## en-US

RadioGroup direction.

```jsx
import { Radio } from 'td-ui';
const RadioGroup = Radio.RadioGroup;

class App extends React.Component {

  onChange = (e) => {
    console.log('radio checked', e.target.value);
  }

  render() {
    return (
      <div>
        <RadioGroup value={11} direction="vertical" onChange={this.onChange}>
          <Radio value={11}>radio11</Radio>
          <Radio value={22}>radio22</Radio>
          <Radio value={33}>radio33</Radio>
        </RadioGroup>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
