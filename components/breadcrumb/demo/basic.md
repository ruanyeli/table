---
order: 0
title:
  zh-CN: 基本用法
  en-US: basic usage
desc:
  zh-CN:
  en-US:
---

## zh-CN

最基本用法。

## en-US

The most basic usage

```jsx
import { Breadcrumb } from 'td-ui';
import { Router, Route, Link, hashHistory } from 'react-router';
const BreadcrumbItem = Breadcrumb.Item;
ReactDOM.render(
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
      <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
, MOUNT_NODE);
```
