---
order: 3
title:
  en-US: lazyload
  zh-CN: 延迟加载
---

## zh-CN

通过滚动条延迟加载。

## en-US

Rows can be selectable by making first column as a selectable column.

````jsx
import { Table } from 'td-ui';

const eventTypes = {
  Login: '登陆事件',
  Loan: '借款事件'
};

const dataSource = [{
  key: '1',
  seqId: 'xxx1',
  eventType: 'Login',
  occurTime: '2017-07-20 15:59:01'
}, {
  key: '2',
  seqId: 'xxx2',
  eventType: 'Login',
  occurTime: '2017-07-20 15:56:49'
}, {
  key: '3',
  seqId: 'xxx3',
  eventType: 'Loan',
  occurTime: '2017-07-20 15:53:21'
}, {
  key: '4',
  seqId: 'xxx4',
  eventType: 'Login',
  occurTime: '2017-07-20 14:59:14'
}, {
  key: '5',
  seqId: 'xxx1',
  eventType: 'Login',
  occurTime: '2017-07-20 15:59:01'
}, {
  key: '6',
  seqId: 'xxx2',
  eventType: 'Login',
  occurTime: '2017-07-20 15:56:49'
}, {
  key: '7',
  seqId: 'xxx3',
  eventType: 'Loan',
  occurTime: '2017-07-20 15:53:21'
}, {
  key: '8',
  seqId: 'xxx4',
  eventType: 'Login',
  occurTime: '2017-07-20 14:59:14'
}, {
  key: '9',
  seqId: 'xxx1',
  eventType: 'Login',
  occurTime: '2017-07-20 15:59:01'
}, {
  key: '10',
  seqId: 'xxx2',
  eventType: 'Login',
  occurTime: '2017-07-20 15:56:49'
}, {
  key: '11',
  seqId: 'xxx3',
  eventType: 'Loan',
  occurTime: '2017-07-20 15:53:21'
}, {
  key: '12',
  seqId: 'xxx4',
  eventType: 'Login',
  occurTime: '2017-07-20 14:59:14'
}];

const columns = [{
  title: 'Sequence ID',
  dataIndex: 'seqId',
  key: 'seqId',
  filters: [{
    text: 'xxx1',
    value: 'xxx1'
  }, {
    text: 'xxx2',
    value: 'xxx2'
  }, {
    text: 'xxx3',
    value: 'xxx3'
  }, {
    text: 'xxx4',
    value: 'xxx4'
  }],
  filterMultiple: false,
  onFilter: (value, record) => record.seqId.indexOf(value) === 0,
  sorter: (a, b) => a.seqId > b.seqId ? 1 : (a.seqId == b.seqId ? 0 : -1),
}, {
  title: '事件类型',
  dataIndex: 'eventType',
  key: 'eventType',
  filters: Object.keys(eventTypes).map(key => ({
    text: eventTypes[key],
    value: key
  })),
  render: type => eventTypes[type],
  onFilter: (value, record) => (record.eventType || eventTypes[record.eventType]).indexOf(value) === 0
}, {
  title: '发生时间',
  dataIndex: 'occurTime',
  key: 'occurTime',
  sorter: (a, b) => (new Date(a.occurTime).getTime()) - (new Date(b.occurTime).getTime())
}];

ReactDOM.render(
  <Table columns={columns} dataSource={dataSource} pagination={{pageSize: 20}} scroll={{y: 205}} lazyload />
, mountNode);
````
