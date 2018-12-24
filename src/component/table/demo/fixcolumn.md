---
order: 5
title:
  en-US: Fix Column
  zh-CN: 固定列
---

## zh-CN

对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和 scroll.x 配合使用。

## en-US

Fix Column.

````jsx
import { Table } from 'td-ui';

const columns = [
  { title: 'seqId', width: 300, dataIndex: 'seqId', key: 'seqId', fixed: 'left' },
  { title: 'occurTime', width: 200, dataIndex: 'occurTime', key: 'occurTime', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'eventType', key: '1' },
  { title: 'Column 2', dataIndex: 'eventType', key: '2' },
  { title: 'Column 3', dataIndex: 'eventType', key: '3' },
  { title: 'Column 4', dataIndex: 'eventType', key: '4' },
  { title: 'Column 5', dataIndex: 'eventType', key: '5' },
  { title: 'Column 6', dataIndex: 'eventType', key: '6' },
  { title: 'Column 7', dataIndex: 'eventType', key: '7' },
  { title: 'Column 8', dataIndex: 'eventType', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="#">action</a>,
  },
];

const dataSource = [{
  key: '1',
  seqId: '1500537541872152S170C295D6830048',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:59:01'
}, {
  key: '2',
  seqId: '1500537409406188S170C295D7848529',
  eventType: '借款事件',
  occurTime: '2017-07-20 15:56:49'
}];

ReactDOM.render(<Table columns={columns} dataSource={dataSource} scroll={{ x: 1300 }} />, mountNode);
````
