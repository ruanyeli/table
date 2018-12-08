---
order: 1
title:
  zh-CN: 分组
  en-US: basic usage
desc:
  zh-CN: 用 OptGroup 进行选项分组。
  en-US: basic pagination
---

## zh-CN

分组

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Select } from 'td-ui';
const Option = Select.Option;
const OptGroup = Select.OptGroup;

class Demo extends React.Component {
  render() {
    return (
      <Select placeholder='请选择' style={{ width: 200 }}>
         <OptGroup label='Manager'>
           <Option value='jack'>Jack</Option>
           <Option value='lucy'>Lucy</Option>
         </OptGroup>
         <OptGroup label='Engineer'>
           <Option value='Yiminghe'>yiminghe</Option>
           <Option value='Yiminghe1'>yiminghe1</Option>
         </OptGroup>
       </Select>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
