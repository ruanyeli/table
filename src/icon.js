import React, { Component } from 'react';
import "./index.less";
import Icon from './component/icon/index';
import Loading from './component/loading/index';
import Checkbox from './component/checkbox/index';
import Radio from './component/radio.back/radio';

const CheckboxGroup = Checkbox.CheckboxGroup;

const checkboxOptions1 = ["Tom", "Sham", "Jack", "Mac"];
const checkboxOptions2 = [
  { label: "Tom", value: "Tom" },
  { label: "Sham", value: "Sham"},
  { label: "Jack", value: "Jack" },
  { label: "Mac", value: "Mac" }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: ["Tom", "Mac"],
      value2: ["Mac"]
    };
  }

  onCheckboxGroupChange1 = v => {
    console.log(v);
    this.setState({ value1: v })
  }
  onCheckboxGroupChange2 = v => {
    console.log(v);
    this.setState({ value2: v })
  }
  render() {
    const CheckboxGroup = Checkbox.CheckboxGroup;
    console.log('icon');
    return (
      <div className="App">
        <Icon type="link" />
        <Icon type="loading" />
        <Icon type="more" />
        <Loading text="请稍后" size="large" />
        <CheckboxGroup defaultValue={[1]} onChange={this.onChange}>
          <Checkbox value={1}>测试1</Checkbox>
          <Checkbox value={2}>测试2</Checkbox>
          <Checkbox value={3}>测试3</Checkbox>
        </CheckboxGroup>
        <CheckboxGroup value={this.state.value1} options={checkboxOptions1} onChange={this.onCheckboxGroupChange1} />
        <CheckboxGroup value={this.state.value2} options={checkboxOptions2} onChange={this.onCheckboxGroupChange2} />
        <Radio value={1} checked={true}>radio</Radio>
        <Radio value={2}>radio2</Radio>
      </div>
    );
  }
}

export default App;