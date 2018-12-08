import React from 'react';
import Select from '../index';
const Option = Select.Option;
const OptGroup = Select.OptGroup;

export default class Multiple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: ['101', '201', '301', '40', '50', '60', '70', '80', '90', '100'],
      value: ['101', '201', '302']
    }
  }
  handleChange = value => {
    console.log(value);
    this.setState({value});
  }
  render() {
    const value = this.state.value;
    const arr = this.state.arr;
    return (
      <div>
        <Select mode='multiple' disabled={true} placeholder='请选择' size='large' style={{ width: 250 }} value={value} onChange={this.handleChange}>
          {
            arr.map((item, index) => <Option value={item} key={item}>{item}条／页</Option>)
          }
        </Select>
        <div style={{height: 160, overflow: 'auto'}}>
          <Select mode='multiple' placeholder='请选择' style={{marginTop: '20px', width: '300px'}} overflow='clip'>
            <OptGroup label="Manager">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </OptGroup>
            <OptGroup label="Engineer">
              <Option value="Yiminghe">yiminghe</Option>
              <Option value="Yiminghe1">yiminghe1</Option>
              <Option value="Yiminghe2">yiminghe2</Option>
              <Option value="Yiminghe3">yiminghe3</Option>
              <Option value="Yiminghe4">yiminghe4</Option>
              <Option value="Yiminghe5">yiminghe5</Option>
              <Option value="Yiminghe6">yiminghe6</Option>
            </OptGroup>
          </Select>
        </div>
      </div>
    )
  }
}
