---
order: 2
title:
  zh-CN: 单选组合
  en-US: Radio Group
---

## zh-CN

一组互斥的 Radio 配合使用。

## en-US

A group of radio components.

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
        <RadioGroup onChange={this.onChange}>
          <Radio value={1}>radio1</Radio>
          <Radio value={2}>radio2</Radio>
          <Radio value={3}>radio3</Radio>
        </RadioGroup>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
