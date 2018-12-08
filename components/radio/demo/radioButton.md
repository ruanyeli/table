---
order: 5
title:
  zh-CN: 按钮样式
  en-US: radio style
---

## zh-CN

按钮样式的单选组合。

## en-US

The combination of radio button style.

```jsx
import { Radio } from 'td-ui';
const RadioButton = Radio.RadioButton;
const RadioGroup = Radio.RadioGroup;


ReactDOM.render(<div>
    <div>
      <RadioGroup value={11}>
        <RadioButton value={11}>radio11</RadioButton>
        <RadioButton value={22}>radio22</RadioButton>
        <RadioButton value={33}>radio33</RadioButton>
      </RadioGroup>
    </div>
  <div>
    <RadioGroup defaultValue={22} disabled>
      <RadioButton value={11}>radio11</RadioButton>
      <RadioButton value={22}>radio22</RadioButton>
      <RadioButton value={33}>radio33</RadioButton>
    </RadioGroup>
  </div>
</div>, mountNode);
```
