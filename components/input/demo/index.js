/**
 * @Author:  GinaLu <ljq>
 * @Date:   2017-05-16 14:49:49
 * @Last modified by:   ljq
 * @Last modified time: 2017-05-16 18:33:09
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Group from './group';
import Select from '../../select';
import Checkbox from '../../checkbox';
import TimePicker from '../../time-picker';
import DatePicker from '../../date-picker';
import Area from './textarea';
const MOUNT_NODE = document.getElementById('app');

let render = () => {
  let Input = require('../index').default;
  let Search = Input.Search;
  function Demo() {
    return (
      <div className="td">
        <div>
          <Input style={{width: 200}}/>
          <Checkbox disabled checked={true}>Checkbox</Checkbox>
          <Select value={"dsadsa"} style={{width: 200}}>
            <Select.Option value="dsadsa">sdsd</Select.Option>
          </Select>
          <TimePicker />
          <DatePicker />
        </div>
        <div style={{padding: '20px'}}>
          <Input placeholder="gina" disabled/>
        </div>
        <div style={{padding: '20px'}}>
          <Input placeholder="gina" defaultValue='123' addonBefore="我是名字" style={{marginBottom: '20px'}}/>
          <Input placeholder="gina" size='small' addonBefore="我是名字" style={{marginBottom: '20px'}}/>
          <Input placeholder="gina" size='large' addonBefore="我是名字" style={{marginBottom: '20px'}}/>
        </div>
        <div style={{padding: '20px'}}>
          <Input placeholder="124x" addonAfter="元" style={{marginBottom: '20px'}}/>
          <Input placeholder="124x" size='small' addonAfter="元" style={{marginBottom: '20px'}}/>
          <Input placeholder="124x" size='large' addonAfter="元"/>
        </div>
        <div style={{padding: '20px'}}>
          <Input defaultValue="123456" addonAfter="元" id="number"/>
        </div>
        <div style={{padding: '20px'}}>
          <Input placeholder="large size" size="large"/>
        </div>
        <div style={{padding: '20px'}}>
          <Input placeholder="small size" size="small"/>
        </div>
        <div>
          <Search
            placeholder="input search text"
            style={{ width: 200 }}
            onSearch={value => console.log(value)}
          />
        </div>     
        <Group/>
        <Area />
      </div>
    );
  }

  ReactDOM.render(<Demo />, MOUNT_NODE);
};

try {
  render();
} catch (e) {
  console.log(e);
}

if (module.hot) {
  module.hot.accept(['../index'], () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    });
  });
}
