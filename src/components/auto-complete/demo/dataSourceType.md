---
order: 2
title:
  zh-CN: dataSource支持不同类型数据
  en-US: basic usage
desc:
  zh-CN: 支持`object`, `Option`, 或者将Option放children里面
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
      dataSource2: [],
      dataSource3: [],
      value: '',
      value2: '',
      value3: ''
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

  handleSearch2 = (value) => {
    console.log('search', value);
    setTimeout(() => {
      this.setState({
        dataSource2: !value ? [] : [{
          value: value + value,
          text: '显示名' + value + value
        }, {
          value: value + value + value,
          text: '显示名' + value + value + value
        }]
      });
    }, 300)
  }

  handleSearch3 = (value) => {
    console.log('search', value);
    setTimeout(() => {
      this.setState({
        dataSource3: !value ? [] : [{
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
  onChange2 = (value) => {
    console.log('onChange', value);
    this.setState({
      value2: value
    })
  }
  onChange3 = (value) => {
    console.log('onChange', value);
    this.setState({
      value3: value
    })
  }

  onSelect = (value, obj) => {
    console.log('onSelect', value, obj);
  }

  render() {
    const { dataSource, dataSource2, dataSource3, value, value2, value3 } = this.state;
    const options = dataSource2.map(item => <Option disabled={!!item.disabled} key={item.value} value={item.value}>{item.text}</Option>);
    const options2 = dataSource3.map(item => <Option disabled={!!item.disabled} key={item.value} value={item.value}>{item.text}</Option>);
    return (
      <div>
        <AutoComplete
          allowClear
          dataSource={dataSource}
          value={value}
          style={{ width: 200, marginRight: 10 }}
          onChange={this.onChange}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
          optionLabelProp="text"
          placeholder="input here"
        />
        <AutoComplete
          allowClear
          dataSource={options}
          value={value2}
          style={{ width: 200, marginRight: 10 }}
          onChange={this.onChange2}
          onSelect={this.onSelect}
          onSearch={this.handleSearch2}
          optionLabelProp="text"
          placeholder="input here"
        />
        <AutoComplete
          allowClear
          value={value3}
          style={{ width: 200 }}
          onChange={this.onChange3}
          onSelect={this.onSelect}
          onSearch={this.handleSearch3}
          optionLabelProp="text"
          placeholder="input here"
        >
          {options2}
        </AutoComplete>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
