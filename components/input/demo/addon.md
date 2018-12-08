---
order: 3
title:
  zh-CN: 前置／后置标签
  en-US: Type
desc:
  zh-CN: 用于配置一些固定组合。
  en-US: Type
---

## zh-CN

## en-US

```jsx
import { Input, Select, Icon } from 'td-ui';

const selectBefore = (
  <Select defaultValue="Http://" style={{ width: 90 }}>
    <Option value="Http://">Http://</Option>
    <Option value="Https://">Https://</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue=".com" style={{ width: 80 }}>
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
);

ReactDOM.render(
  <div>
    <div style={{ marginBottom: 16, width: 400 }}>
      <Input addonBefore="Http://" addonAfter=".com" defaultValue="mysite" />
    </div>
    <div style={{ marginBottom: 16, width: 400 }}>
      <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" />
    </div>
    <div style={{ marginBottom: 16, width: 400 }}>
      <Input addonAfter={<Icon type="setting" />} defaultValue="mysite" />
    </div>
  </div>
, mountNode);
```
