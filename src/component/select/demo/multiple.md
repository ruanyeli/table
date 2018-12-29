---
order: 3
title:
  zh-CN: 多选
  en-US: basic usage
desc:
  zh-CN: 多选，从已有条目中选择
  en-US: basic pagination
---

## zh-CN

多选

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Select, Radio } from 'td-ui';
const Option = Select.Option;
const RadioGroup = Radio.RadioGroup;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: ['101', '201', '301', '40', '50', '60', '70', '80', '90', '100'],
      value: ['101', '201'],
      overflow: false,
    }
  }
  handleChange = value => {
    console.log(value);
    this.setState({value});
  }
  render() {
    const { value, arr, overflow } = this.state;
    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <RadioGroup value={overflow} onChange={(e) => this.setState({ overflow: e.target.value })}>
            <Radio value={false}>不裁剪</Radio>
            <Radio value={'clip'}>只裁剪</Radio>
            <Radio value={'ellipsis'}>裁剪且显示省略号</Radio>
          </RadioGroup>
        </div>
        <Select mode='multiple' placeholder='请选择' style={{ width: 250 }} value={value} onChange={this.handleChange} overflow={overflow}>
          {
            arr.map((item, index) => <Option value={item} key={item}>{item}条／页</Option>)
          }
        </Select>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
