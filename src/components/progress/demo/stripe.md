---
order: 1
title:
  zh-CN: 条纹进度条
  en-US: stripe progress
desc:
  zh-CN: 条纹进度条
  en-US: stripe progress
---

## zh-CN

条纹进度条

## en-US

stripe progress

```jsx
import {Progress} from 'td-ui';
ReactDOM.render(
  <div>
  
    <Progress type="stripe" percent={20} width={40} height={20}/>
    <br/>
    <Progress type="stripe" percent={30} width={400}/>
    <br/>
    <Progress type="stripe" status="success"/>
    <br/>
    <Progress type="stripe" status="exception" percent={50}/>
  </div>
, mountNode);
```