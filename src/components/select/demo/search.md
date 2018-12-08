---
order: 2
title:
  zh-CN: 带搜索框
  en-US: basic usage
desc:
  zh-CN: 展开后可对选项进行搜索。
  en-US: basic pagination
---

## zh-CN

展开后可对选项进行搜索。

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Select } from 'td-ui';
const Option = Select.Option;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'one'
    }
  }
  handleChange = value => {
    this.setState({
      value
    })
  }
  render() {
    return (
      <div>
        <Select
          style={{ width: 200, marginRight: 10 }}
          placeholder="Select a person"
          onChange={this.handleChange}
          value={this.state.value}
          showSearch
        >
          <Option value="one">第一</Option>
          <Option value="two">第二</Option>
          <Option value="three">第三</Option>
          <Option value="four">第四</Option>
          <Option value="five">第五</Option>
          <Option value="six">第六</Option>
          <Option value="seven">第七</Option>
          <Option value="nine">第八</Option>
          <Option value="ten">第九</Option>
          <Option value="eleven">第十</Option>
          <Option value="twelve">第十一</Option>
          <Option value="thirteen">第十二</Option>
        </Select>
        <Select
          style={{ width: 200 }}
          placeholder="Select a person"
          showSearch
        >
          <Option value="one">第一</Option>
          <Option value="two">第二</Option>
          <Option value="three">第三</Option>
          <Option value="four">第四</Option>
          <Option value="five">第五</Option>
          <Option value="six">第六</Option>
          <Option value="seven">第七</Option>
          <Option value="nine">第八</Option>
          <Option value="ten">第九</Option>
          <Option value="eleven">第十</Option>
          <Option value="twelve">第十一</Option>
          <Option value="thirteen">第十二</Option>
        </Select>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
