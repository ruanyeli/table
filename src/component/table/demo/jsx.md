---
order: 1
title:
  en-US: JSX Usage
  zh-CN: JSX风格
---

## zh-CN

JSX风格的简单表格。

## en-US

Simple table.

````jsx
import { Table } from 'td-ui';

const Column = Table.Column;
const ColumnGroup = Table.ColumnGroup;

const dataSource = [{
  key: '1',
  seqId: '1500537541872152S170C295D6830048',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:59:01',
  endTime: '2017-07-30 15:30:11'
}, {
  key: '2',
  seqId: '1500537409406188S170C295D7848529',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:56:49',
  endTime: '2017-07-26 15:32:14'
}];

ReactDOM.render(
  <Table dataSource={dataSource}>
    <Column title="Sequence ID" dataIndex="seqId" key="seqId" />
    <Column title="事件类型" dataIndex="eventType" key="eventType" />
    <ColumnGroup title="时间">
      <Column title="发生时间" dataIndex="occurTime" key="occurTime" />
      <Column title="结束时间" dataIndex="endTime" key="endTime" />
    </ColumnGroup>
  </Table>
  , mountNode);
````
