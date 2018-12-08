import React from 'react';
import Tabs from '../index';
const TabPane = Tabs.TabPane;

export default class Editable extends React.Component {
  handleChange = activeKey => {
    console.log(activeKey);
  }
  render() {
    return (
      <Tabs
        defaultActiveKey="1"
        onChange={this.handleChange}
        editable
        onTabTitleChange={(activeKey, title) => {console.log('change title', activeKey, title)}}
        preTabbarExtra={<a>test</a>}
        postTabbarExtra={<a>xxx</a>}
      >
        <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
        <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
      </Tabs>
    )
  }
}
