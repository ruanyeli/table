---
order: 1
title:
  zh-CN: 默认值
  en-US: Type
desc:
  zh-CN: 默认值通过数组的方式指定。
  en-US: Type
---

## zh-CN


## en-US


```jsx
import { Cascader } from 'td-ui';

const options = [{
  'label': '江苏',
  'value': 'js',
  'children': [{
    'label': '南京',
    'value': 'nanjing',
    'children': [{
      'label': '秦淮',
      'value': 'qinhuai'
    }]
  }, {
    'label': '苏州',
    'value': 'suzhou'
  }]
}, {
  'label': '浙江',
  'value': 'zj',
  'children': [{
    'label': '杭州',
    'value': 'hangzhou',
    'children': [{
      'label': '西湖',
      'value': 'xihu'
    }, {
      'label': '拱墅',
      'value': 'gongshu'
    }]
  }, {
    'label': '宁波',
    'value': 'ningbo'
  }]
}];

ReactDOM.render(
  <div>
    <Cascader
      options={options}
      defaultValue={['zj', 'hangzhou', 'xihu']}
    />
  </div>
, mountNode);
```
<style>
.td-btn {
  margin: 5px;
}
</style>
