---
order: 2
title:
    zh-CN: Checkbox 组
    en-US: Checkbox Group
---

## zh-CN

方便的从数组生成 Checkbox 组。

## en-US

Generate a group of checkboxes from an array.

````jsx
import { Checkbox } from 'td-ui';
const CheckboxGroup = Checkbox.CheckboxGroup;

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

ReactDOM.render(
  <div>
    <CheckboxGroup defaultValue={[1]} onChange={onChange}>
        <Checkbox value={1}>Checkbox1</Checkbox>
        <Checkbox value={2}>Checkbox2</Checkbox>
        <Checkbox value={3}>Checkbox3</Checkbox>
     </CheckboxGroup>
  </div>
, mountNode);
````
