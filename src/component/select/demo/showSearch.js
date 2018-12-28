import React from 'react';
import Select from '../index';
const Option = Select.Option;
let arr = [];
for (let i = 0; i < 10000; i++) {
  arr.push(i + '');
}
export default class showSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'one'
    }
  }
  handleChange = value => {
    console.log(value);
    this.setState({
      value
    })
  }
  handleSearch = value => {
    // console.log(value);
    // this.setState({value})
  }
  render() {
    return (
      <div>
        <Select
          style={{ width: 200 }}
          placeholder="Select a person"
          onChange={this.handleChange}
          value={this.state.value}
          showSearch
          onSearch={this.handleSearch}
        >
          <Option value="one" alias="one">第一</Option>
          <Option value="two" alias="two">第二</Option>
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
          defaultValue='one'
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
