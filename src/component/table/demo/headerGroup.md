---
order: 9
title:
  en-US: Header Group
  zh-CN: 表头分组
---

## zh-CN

columns[n] 可以内嵌 children，以渲染分组表头。

## en-US

Simple table.

````jsx
import { Table } from 'td-ui';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 100,
  fixed: 'left',
  filters: [{
    text: 'Joe',
    value: 'Joe',
  }, {
    text: 'John',
    value: 'John',
  }],
  onFilter: (value, record) => record.name.indexOf(value) === 0,
}, {
  title: 'Other',
  children: [{
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 200,
    sorter: (a, b) => a.age - b.age,
  }, {
    title: 'Address',
    children: [{
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
      width: 200,
    }, {
      title: 'Block',
      children: [{
        title: 'Building',
        dataIndex: 'building',
        key: 'building',
        width: 100,
      }, {
        title: 'Door No.',
        dataIndex: 'number',
        key: 'number',
        width: 100,
      }],
    }],
  }],
}, {
  title: 'Company',
  children: [{
    title: 'Company Address',
    dataIndex: 'companyAddress',
    key: 'companyAddress',
    width: 160,
  }, {
    title: 'Company Name',
    dataIndex: 'companyName',
    key: 'companyName',
  }],
}, {
  title: 'Gender',
  dataIndex: 'gender',
  key: 'gender',
  width: 60,
  fixed: 'right',
}];

const dataSource = [];
for (let i = 0; i < 100; i++) {
  dataSource.push({
    key: i,
    name: 'John Brown76575647564',
    age: i + 1,
    street: 'Lake Par45645645654k',
    building: 'C',
    number: 2035434543546456,
    companyAddress: 'Lake Street 4213122',
    companyName: 'SoftLake Co',
    gender: 'M' + i,
  });
}

ReactDOM.render(
  <Table
    columns={columns}
    dataSource={dataSource}
    bordered
    size="middle"
    scroll={{ x: '130%', y: 240 }}
  />
, mountNode);
````
