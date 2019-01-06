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

export default class TableExample extends Component {

  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      align: 'center',
      onHeaderCell: (text, row, index) => {
        return (
          <div>
            <a onClick={() => console.log('id => ', text, row, index)}>
              {text}
            </a>
          </div>
        );
      },
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '20%',
      align: 'right',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      align: 'right',
      render: (text, row, index) => {
        return (
          <div>
            <a onClick={() => console.log('id => ', text, row, index)}>
              {text}
            </a>
          </div>
        );
      },
    }];
    return (
      <div>
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>
    );
  }
}
