---
order: 1
title:
  zh-CN: 标题可编辑(受控)
  en-US: Type
desc:
  zh-CN: 使tab的标题可以编辑
  en-US: Type
---

## zh-CN


## en-US


```jsx
import { Tabs, Icon } from 'td-ui';
const TabPane = Tabs.TabPane;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1',
      tabList: [
        {key: '1', title: 'tab1', content: 'Tab1'},
        {key: '2', title: 'tab2', content: 'Tab2'},
        {key: '3', title: 'tab3', content: 'Tab3'}
      ]
    };
  }

  handleChange = (key) => {
    this.setState({
      activeKey: key
    })
  }

  onTabTitleChange = (key, title) => {
    const { tabList } = this.state;
    const index = tabList.findIndex(item => item.key === key);
    if (index >= 0) {
      tabList[index].title = title;
      this.setState({ tabList });
    }
  };

  render() {
    const { tabList, activeKey } = this.state;
    return (
      <Tabs
        activeKey={activeKey}
        onChange={this.handleChange}
        titleEditable
        onTabTitleChange={this.onTabTitleChange}
      >
        {tabList.map(item => <TabPane key={item.key} tab={item.title}>{item.content}</TabPane>)}
      </Tabs>
    );
  }
}

ReactDOM.render(
  <div>
      <Demo />
  </div>
, mountNode);
```
<style>
.td-btn {
  margin: 5px;
}
</style>
