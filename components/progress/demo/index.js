/**
 * @Author: Yingxi.Hao <yzf>
 * @Date:   2017-06-20
 * @Last modified by:   hyx
 * @Last modified time: 2017-06-23
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Table from '../../table';

const MOUNT_NODE = document.getElementById('app');
let Progress = require('../index').default;
const columns = [
  {
      title: '任务编号',
      dataIndex: 'taskId',
      key: 'taskId'
  },
  {
      title: '发送时间',
      dataIndex: 'sendTime',
      key: 'sendTime'
  },
  {
      title: '手机号',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
  },
  {
      title: '模板编号',
      dataIndex: 'no',
      key: 'no'
  },
  {
      title: '版本号',
      dataIndex: 'templateVersion',
      key: 'templateVersion'
  },
  {
      title: '模板名称',
      dataIndex: 'templateName',
      key: 'templateName',
  },
  {
      title: '测试',
      dataIndex: 'progress',
      key: 'progress',
      width: '50%',
      // render: () => <Progress type="stripe" percent={50.55} status='warning' height={10}/>
      render: () => <Progress type="stripe" percent={66} status='exception' targetStatus='exception' targetPercent={66} height={14} width={200} />
  }
]
let render = () => {
  
  function Demo() {
    return (
      <div className="td">
        <p>line</p>
        <Progress type="line" percent={100} height={20}/>
        <br/>
        <Progress type="line" showPercent={false} status='warning' percent={20.1} width={40} height={30} targetType='stripe' targetStatus='exception' targetPercent={60}/>
        <br/>
        <Progress type="line" percent={130} status='warning' width={500}/>
        <br/>
        <Progress type="line" status="success" percent={50}/>
        <br/>
        <Progress type="line" status="exception" percent={50} showInfo={false} height={40}/>
        <p>stripe</p>
        <Progress type="stripe"/>
        <br />
        <Progress type="stripe" percent={20} targetType='line' targetStatus='warning' targetPercent={60} height={20}/>
        <br/>
        <div>
          <Progress type="stripe" percent={20} targetStatus='warning' targetPercent={60} height={20}/>
        </div>
        <br/>
        <Progress type="stripe" percent={30} height={50}/>
        <br/>
        <Progress type="stripe" status="success"/>
        <br/>
        <Progress type="stripe" status="exception" percent={50}/>
        <p>circle</p>
        <Progress type="circle" height={10}/>
        <Progress type="circle" percent={20} width={300} height={20}/>
        <Progress type="circle" percent={100} width={50}/>
        <Progress type="circle" status="success" percent={100} width={500} height={30}/>
        <div>
          <Progress type="circle" status="exception" percent={50} targetStatus='warning' targetPercent={80}/>
          <Progress type="circle" status="exception" percent={70}/>
          <Progress type="circle" status="exception" percent={80} height={5}/>
        </div>
        <div style={{ marginTop: 130 }}>
          <Table 
            dataSource={[{id: 1}]}
            columns={columns}
            rowKey='id'
          />
        </div>
      </div>
    );
  }

  ReactDOM.render(<Demo />, MOUNT_NODE);
};

try {
  render();
} catch (e) {
  console.log(e);
}

if (module.hot) {
  module.hot.accept(['../index'], () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    });
  });
}
