---
order: 4
title:
  zh-CN: 别名
  en-US: alias
desc:
  zh-CN: 添加别名
  en-US: basic pagination
---

## zh-CN

为选项添加别名

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Select } from 'td-ui';
const Option = Select.Option;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [{value: 1, alias: 'ten', label: '一'}, {value: 2, alias: 'two', label: '二'}, {value: 3, alias: 'two', label: '三'}],
      value: "1"
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
        <Select value={value} style={{ width: 120, marginRight: 10 }} onChange={this.handleChange} allowClear>
          {
            arr.map((item, index) => <Option value={item.value} key={item.value} alias={item.alias}>{item.label}</Option>)
          }
        </Select>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
