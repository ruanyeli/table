import React, { Component } from 'react';
import Table from '../../components/table';

const data = [{
  id: '111',
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  id: '112',
  key: '2',
  name: 'Joe Black',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  id: '113',
  key: '3',
  name: 'Jim Green',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  id: '114',
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
}];

const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

export default class TableSizeExample extends Component {
  render() {
    return (
      <div>
        <Table columns={columns} dataSource={data} size="small" />
        <Table columns={columns} dataSource={data} size="middle" />
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}
