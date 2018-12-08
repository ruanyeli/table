---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的用法。

## en-US

The most basic example. 

````jsx
import { Popconfirm, Button } from 'td-ui';

const content = "Are you sure?";

ReactDOM.render(
  <Popconfirm content={content} onConfirm={()=>console.log('onConfirm')} onCancel={()=>console.log('onCancel')}>
    <Button type="primary">点我</Button>
  </Popconfirm>
, mountNode);
````
