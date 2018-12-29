---
order: 4
title:
  en-US: Expand Table
  zh-CN: 可展开的列表
---

## zh-CN

当表格内容较多不能一次性完全展示时。

## en-US

Expand Table.

````jsx
import { Table } from 'td-ui';

const dataSource = [{
  key: '1',
  seqId: '1500537541872152S170C295D6830048',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:59:01',
  description: 'description'
}, {
  key: '2',
  seqId: '1500537409406188S170C295D7848529',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:56:49',
  description: 'description'
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

ReactDOM.render(<Table columns={columns} expandedRowRender={record => <p>{record.description}</p>} dataSource={dataSource}  />, mountNode);
````
