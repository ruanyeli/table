import React, { Component } from 'react';
import "./index.less";
import Table from './components/table/index';
import SB from './baseTable';
import ChoiceableTable from './choiceableTable';
import ResizableTable from './resizableTable';
import MergeTable from './mergeTable';
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


class App extends Component {
  render() {
    console.log('table')
    return (
      <div className="App">
        <Table columns={columns} dataSource={dataSource}  rowKey='id' />
        <SB/>
        <ChoiceableTable/>
        <ResizableTable />
        <MergeTable/>
      </div>
    );
  }
}

export default App;
