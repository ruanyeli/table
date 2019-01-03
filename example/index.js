import React, { Component } from 'react';
import './index.less';
import { Icon } from '../components';
import { Table } from '../components';
import { Radio } from '../components';

const Column = Table.Column;


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


export default class RadioExample extends Component {
  render() {
    return (
      <div id="demo">
          aaaa
        <div className="wrapper-div">demo</div>
        <Icon type="loading" />
        <Radio value={1} checked={true}>radio</Radio>
        <Table columns={columns} dataSource={dataSource} />
      </div>
    );
  }
}
