---
order: 6
title:
  en-US: Bordered Table
  zh-CN: 带边框的表格
---

## zh-CN

添加表格边框线，页头和页脚。

## en-US

Simple table.

````jsx
import { Table } from 'td-ui';

const dataSource = [{
  key: '1',
  seqId: '1500537541872152S170C295D6830048',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:59:01'
}, {
  key: '2',
  seqId: '1500537409406188S170C295D7848529',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:56:49'
}];

const columns = [{
  title: 'Sequence ID',
  dataIndex: 'seqId',
  key: 'seqId',
  render: seqId => <a href="#">{seqId}</a>,
}, {
  title: '事件类型',
  dataIndex: 'eventType',
  key: 'eventType',
}, {
  title: '发生时间',
  dataIndex: 'occurTime',
  key: 'occurTime',
}];

ReactDOM.render(
  <Table 
    columns={columns}
    dataSource={dataSource}
    bordered
    title={() => 'Header'}
    footer={() => 'Footer'}
    />, mountNode);
````
