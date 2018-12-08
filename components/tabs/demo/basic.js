import React from 'react';
import Tabs from '../index';
const TabPane = Tabs.TabPane;

export default class Basic extends React.Component {
  handleChange = activeKey => {
    console.log(activeKey);
  }
  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.handleChange}>
        <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
        <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
        {false?<TabPane tab="Tab 4" key="4">Content of Tab Pane 4</TabPane>:null}
        <TabPane tab="Tab 5" key="5">Content of Tab Pane 5</TabPane>
        <TabPane tab="Tab 6" key="6">Content of Tab Pane 6</TabPane>
      </Tabs>
    )
  }
}
