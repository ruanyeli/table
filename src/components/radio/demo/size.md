---
order: 6
title:
  zh-CN: 大小
  en-US: Size
---

## zh-CN

大中小三种组合，可以和表单输入框进行对应配合。

## en-US

There are three sizes available: large, medium, and small. It can coordinate with input box.

```jsx
import { Radio } from 'td-ui';
const RadioButton = Radio.RadioButton;
const RadioGroup = Radio.RadioGroup;

ReactDOM.render(<div>
  <div>
    <RadioGroup defaultValue={22} size="large">
      <RadioButton value={11}>radio11</RadioButton>
      <RadioButton disabled value={22}>radio22</RadioButton>
      <RadioButton value={33}>radio33</RadioButton>
    </RadioGroup>
  </div>
  <div>
    <RadioGroup defaultValue={22}>
      <RadioButton value={11}>radio11</RadioButton>
      <RadioButton value={22}>radio22</RadioButton>
      <RadioButton value={33}>radio33</RadioButton>
    </RadioGroup>
  </div>
  <div>
    <RadioGroup defaultValue={22}  size="small">
      <RadioButton value={11}>radio11</RadioButton>
      <RadioButton value={22}>radio22</RadioButton>
      <RadioButton value={33}>radio33</RadioButton>
    </RadioGroup>
  </div>
</div>, mountNode);
```
