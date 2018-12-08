---
order: 0
title:
  zh-CN: 基本用法
  en-US: basic usage
desc:
  zh-CN: 基本使用。通过 dataSource 设置自动完成的数据源
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
      dataSource: [],
      value: ''
    }
  }
  handleSearch = (value) => {
    console.log('search', value);
    setTimeout(() => {
      this.setState({
        dataSource: !value ? [] : [{
          value: value + value,
          text: '显示名' + value + value
        }, {
          value: value + value + value,
          text: '显示名' + value + value + value
        }]
      });
    }, 300)
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
          onSearch={this.handleSearch}
          optionLabelProp="text"
          placeholder="input here"
        />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
