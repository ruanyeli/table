---
order: 0
title:
  zh-CN: 标准的进度条
  en-US: line progress
desc:
  zh-CN: 标准的进度条
  en-US: line progress
---

## zh-CN

标准的进度条

## en-US

standard progress(line)

```jsx
import {Progress} from 'td-ui';
ReactDOM.render(
  <div>
    <Progress type="line" percent={20} width={40} height={20}/>
    <br/>
    <Progress type="line" percent={30} width={400}/>
    <br/>
    <Progress type="line" status="success"/>
    <br/>
    <Progress type="line" status="exception" percent={50}/>
  </div>
, mountNode);
```