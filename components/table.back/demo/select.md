---
order: 2
title:
  en-US: selection
  zh-CN: 可选择
---

## zh-CN

第一列是联动的选择框。

## en-US

Rows can be selectable by making first column as a selectable column.

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
}, {
  key: '3',
  seqId: '1500537386207434S170C295D7093772',
  eventType: '登陆事件',
  occurTime: '2017-07-20 15:53:21'
}, {
  key: '4',
  seqId: '1500537333687432S170C295A3171879',
  eventType: '登陆事件',
  occurTime: '2017-07-20 14:59:14'
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

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.seqId === '1500537333687432S170C295A3171879',
  }),
};

ReactDOM.render(
  <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
, mountNode);
````
