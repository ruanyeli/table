---
order: 0
title:
  zh-CN: 简单列表
  en-US: Simple list
---

## zh-CN

列表拥有大、中、小三种尺寸。

通过设置 `size` 为 `large` `small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中。

可通过设置 `header` 和 `footer`，来自定义列表头部和尾部。

## en-US

Simple list

````jsx
import { List } from 'td-ui';

const data = [
  '列表 简单用法 条目一',
  '列表 简单用法 条目二',
  '列表 简单用法 条目三',
  '列表 简单用法 条目四',
  '列表 简单用法 条目五',
];

ReactDOM.render(
  <div>
    <h3 style={{ marginBottom: 16 }}>Default Size</h3>
    <List
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={item => (<List.Item>{item}</List.Item>)}
    />
    <h3 style={{ margin: '16px 0' }}>Small Size</h3>
    <List
      size="small"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={item => (<List.Item>{item}</List.Item>)}
    />
    <h3 style={{ margin: '16px 0' }}>Large Size</h3>
    <List
      size="large"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={item => (<List.Item>{item}</List.Item>)}
    />
  </div>,
  mountNode);
````