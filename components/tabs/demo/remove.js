import React from 'react';
import Tabs from '../index';
const TabPane = Tabs.TabPane;
let arr = [];
for (let i = 0; i < 15; i++) {
  arr.push({
    tab: 'tab' + i,
    key: `${i}`
  })
}
export default class Basic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '4',
      arr
    }
  }
  handleChange = activeKey => {
    this.setState({activeKey});
  }
  onRemove = key => {
    let arr = this.state.arr;
    const index = arr.findIndex(item => item.key === key);
    arr.splice(index, 1);
    this.setState({
      arr
    })
  }
  render() {
    return (
      <Tabs closable onRemove={this.onRemove} defaultActiveKey='4' tabBarPosition='top' style={{height: 200}} animated type='card'>
        {
          this.state.arr.map((item, index) => <TabPane key={item.key} tab={item.tab}>{item.tab}</TabPane>)
        }
      </Tabs>
    )
  }
}
