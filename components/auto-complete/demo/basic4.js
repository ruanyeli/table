import React from 'react';
import AutoComplete from '../index';

export default class Basic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      value: '',
      disabled: false
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
          text: '显示名' + value + value + value,
          disabled: true
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

  onBlur = (value) => {
    console.log(value);
    this.setState({
      disabled: true,
    })
  }

  render() {
    const { dataSource, value, disabled } = this.state;
    const options = dataSource.map(item => <Option disabled={!!item.disabled} key={item.value} value={item.value}>{item.text}</Option>);
    return (
      <div>
        <AutoComplete
          dataSource={options}
          value={value}
          style={{ width: 200 }}
          onChange={this.onChange}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
          placeholder="input here"
          optionLabelProp="text"
          onBlur={this.onBlur}
          defaultValue='asasas'
          allowClear
          disabled={disabled}
         />
      </div>
    )
  }
}
