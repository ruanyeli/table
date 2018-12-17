import React, { Component } from 'react';
import "./index.less";
import Icon from './component/icon/index';
import Loading from './component/loading/index';
import Checkbox from './component/checkbox/index';

class App extends Component {
  render() {
    const CheckboxGroup = Checkbox.CheckboxGroup;
    console.log('icon');
    function onChange(checkedValues) {
      console.log('checked = ', checkedValues);
    }
    
    return (
      <div className="App">
        <Icon type="link"/>
        <Icon type="loading"/>
        <Icon type="more"/>
        <Loading text="请稍后" size="large"/>
        <CheckboxGroup defaultValue={[1]} onChange={onChange}>
            <Checkbox value={1}>测试1</Checkbox>
            <Checkbox value={2}>测试2</Checkbox>
            <Checkbox value={3}>测试3</Checkbox>
        </CheckboxGroup>
      </div>
      
    );
  }
}

export default App;