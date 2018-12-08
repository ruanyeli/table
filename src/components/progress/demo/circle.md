---
order: 2
title:
  zh-CN: 圆形进度条
  en-US: circle progress
desc:
  zh-CN: 圆形进度条
  en-US: circle progress
---

## zh-CN

标准的进度条

## en-US

standard progress(line)

```jsx
import {Progress} from 'td-ui';
ReactDOM.render(
  <div>
      <Progress type="circle" status="exception" percent={50} height={20}/>
      <br/>
      <Progress type="circle" percent={80}/>
      <br/>
      <Progress type="circle" percent={100}/>
      <br/>
      <Progress type="circle" percent={80} width={200}/>
  </div>
, mountNode);
```