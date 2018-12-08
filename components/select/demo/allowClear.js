import React from 'react';
import Select from '../index';
const Option = Select.Option;
let arr = [];
for (let i = 0; i < 1000; i++) {
  arr.push(i + '');
}
export default class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    }
  }
  handleChange = value => {
    this.setState({
      value,
      disabled: true,
    });
  }
  render() {
    const { value, disabled } = this.state;
    return (
      <div>
        <Select placeholder='请选择' showSearch isPage={{visibleCount: 30}} style={{ width: 120 }} defaultValue={value} size='small' onChange={this.handleChange} disabled={disabled} allowClear>
          {
            arr.map((item, index) => <Option value={item} key={item}>{item}条／页</Option>)
          }
        </Select>
      </div>
    )
  }
}
