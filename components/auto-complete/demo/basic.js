import React from 'react';
import AutoComplete from '../index';

export default class Basic extends React.Component {
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
          text: '显示名' + value + value + value,
          disabled: true
        }, {
          value: value + '-' + value,
          text: '显示名' + value + '-' + value
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
  }

  filterOption = (inputValue, Option) => {
    console.log(inputValue, Option);
    return Option.props.value.indexOf('-') < 0;
  }

  render() {
    const { dataSource, value } = this.state;
    return (
      <div>
        <AutoComplete
          dataSource={dataSource}
          value={value}
          style={{ width: 200 }}
          onChange={this.onChange}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
          placeholder="input here"
          optionLabelProp="text"
          onBlur={this.onBlur}
          filterOption={this.filterOption}
        />
      </div>
    )
  }
}
