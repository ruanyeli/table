import React from 'react';
import Tabs from '../index';
import Select from '../../select';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

export default class Position extends React.Component {
  state = {
    tabPosition: 'left',
  }
  changeTabPosition = (tabPosition) => {
    this.setState({ tabPosition });
  }
  render() {
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          Tab position：
          <Select
            value={this.state.tabPosition}
            onChange={this.changeTabPosition}
            dropdownMatchSelectWidth={false}
          >
            <Option value="top">top</Option>
            <Option value="bottom">bottom</Option>
            <Option value="left">left</Option>
            <Option value="right">right</Option>
          </Select>
        </div>
        <Tabs tabBarPosition={this.state.tabPosition} style={{height: 300}}>
          <TabPane tab="Tab 1" key="1">Content of Tab 1</TabPane>
          <TabPane tab="Tab 2" key="2">Content of Tab 2</TabPane>
          <TabPane tab="Tab 3" key="3">Content of Tab 3</TabPane>
          <TabPane tab="Tab 4" key="4">Content of Tab 1</TabPane>
          <TabPane tab="Tab 5" key="5">Content of Tab 2</TabPane>
          <TabPane tab="Tab 6" key="6">Content of Tab 3</TabPane>
          <TabPane tab="Tab 7" key="7">Content of Tab 1</TabPane>
          <TabPane tab="Tab 8" key="8">Content of Tab 2</TabPane>
          <TabPane tab="Tab 9" key="9">Content of Tab 3</TabPane>
        </Tabs>
      </div>
    );
  }
}
