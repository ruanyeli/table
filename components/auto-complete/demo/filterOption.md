---
order: 1
title:
  zh-CN: 使用filterOption过滤数据
  en-US: basic usage
desc:
  zh-CN: 示例：样式如何通过filterOption过滤数据，示例展示了不区分大小写筛选
  en-US: basic pagination
---

## zh-CN

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { AutoComplete } from 'td-ui';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [{
        value: 'jack',
        text: 'Jack'
      }, {
        value: 'lucy',
        text: 'Lucy'
      }, {
        value: 'tom',
        text: 'Tom'
      }],
      value: ''
    }
  }

  onChange = (value) => {
    console.log('onChange', value);
    this.setState({
      value
    })
  }

  onSelect = (value, obj) => {
    console.log('onSelect', value, obj);
  }

  filterOption = (inputValue, Option) => {
    console.log(inputValue, Option);
    return Option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
  }

  render() {
    const { dataSource, value } = this.state;
    return (
      <div>
        <AutoComplete
          allowClear
          dataSource={dataSource}
          value={value}
          style={{ width: 200 }}
          onChange={this.onChange}
          onSelect={this.onSelect}
          optionLabelProp="text"
          placeholder="input here"
          filterOption={this.filterOption}
        />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
