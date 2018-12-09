import React, { Component } from 'react';
import "./index.less";
import Table from './components/table/index';

const dataSource = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  }, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }];
  
  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  }];
  


class App extends Component {
  render() {
    console.log('table')
    return (
      <div className="App">
        <Table columns={columns} dataSource={dataSource}  rowKey='id' />
      </div>
    );
  }
}

export default App;
