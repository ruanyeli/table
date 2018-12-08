/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-21 14:26:49
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-29 11:13:37
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from '../../grid';
import Local from '../../locale-provider/LocaleProvider';
import zhCN from '../../locale-provider/zh_CN';
import enUS from '../../locale-provider/en_US';
const DatePicker = require('../index').default;
const RangePicker = DatePicker.RangePicker;


const MOUNT_NODE = document.getElementById('app');


let render = () => {
  
  function Demo() {
    return (
      <div className="td">
        <Row>
          <Col span={8}>
            <DatePicker size="large" allowClear={false} format="YYYY-MM" renderExtraFooter={(v) => {
              console.log(v);
              return 'dsdds'
            }}/>
          </Col>
          <Col span={8}>
            <DatePicker format="YYYY-MM-DD"/>
          </Col>
          <Col span={8}>
            <DatePicker format="YYYY-MM-DD HH:mm:ss"/>
          </Col>
        </Row>
        <Row style={{ padding: 10 }}>
          <Col span={12}>
            <RangePicker size="large" format="YYYY-MM-DD HH:mm:ss" renderExtraFooter={(v) => {
                            console.log(v);
              return 'dsdds'
            }}/>
          </Col>
          <Col span={12}>
            <RangePicker size="small" format="YYYY-MM-DD" />
          </Col>
        </Row>
        <Row style={{ padding: 10 }}>
          <Col span={12}>
            <RangePicker format="YYYY-MM" />
          </Col>
          <Col span={12}>
            <RangePicker format="YYYY" />
          </Col>
        </Row>
        <Row style={{padding: 10}}>
          <Col span={8}>
            <DatePicker format="YYYY-MM-DD HH:mm:ss" onlyIcon={true}/>
          </Col>
        </Row>
      </div>
    );
  }

  ReactDOM.render(
    <Local locale={zhCN}>
      <Demo />
    </Local>
    ,
    MOUNT_NODE
  );
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
