---
order: 0
title:
  zh-CN: 基本使用(非受控)
  en-US: Type
desc:
  zh-CN: 标签页
  en-US: Type
---

## zh-CN


## en-US


```jsx
import { Tabs, Icon } from 'td-ui';
const TabPane = Tabs.TabPane;

ReactDOM.render(
  <div>
      <Tabs defaultActiveKey="1">
        <TabPane key="1" tab="tab1">Tab1</TabPane>
        <TabPane key="2" tab="tab2">Tab2</TabPane>
        <TabPane key="3" tab="tab3">Tab3</TabPane>
     </Tabs>
  </div>
, mountNode);
```
<style>
.td-btn {
  margin: 5px;
}
</style>
