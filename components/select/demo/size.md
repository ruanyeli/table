---
order: 0
title:
  zh-CN: 大小尺寸
  en-US: select size
desc:
  zh-CN: 基础
  en-US: basic pagination
---

## zh-CN

选择器大小尺寸。

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Select } from 'td-ui';
const Option = Select.Option;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: ['10', '20', '30'],
      value: '10'
    }
  }
  handleChange = value => {
    this.setState({value});
  }
  render() {
    const value = this.state.value;
    const arr = this.state.arr;
    return (
      <div>
        <Select value={value} style={{ width: 120, marginRight: 10 }} size='large' onChange={this.handleChange}>
          {
            arr.map((item, index) => <Option value={item} key={item}>{item}条／页</Option>)
          }
        </Select>
        <Select value={value} style={{ width: 120, marginRight: 10 }}>
          {
            arr.map((item, index) => <Option value={item} key={item}>{item}条／页</Option>)
          }
        </Select>
        <Select value={value} style={{ width: 120 }} size='small' onChange={this.handleChange}>
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
