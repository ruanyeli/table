---
order: 4
title:
  zh-CN: 清除
  en-US: Clear star
---

## zh-CN

支持允许或者禁用清除。

## en-US

Support set allow to clear star when click again.

````jsx
import { Grade } from 'td-ui';

ReactDOM.render(
  <div>
    <Grade defaultValue={3} /> allowClear: true
    <br />
    <Grade allowClear={false} defaultValue={3} /> allowClear: false
  </div>
, mountNode);
````