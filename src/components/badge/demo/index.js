/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-16 14:49:49
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-16 18:33:09
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from '../../grid';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  let Badge = require('../index').default;
  function Demo() {
    return (
      <div className="td">
        <Row>
          <Col span={6}>
            <div>
              <Badge count={5}>
                <a href="#" className="head-example" />
              </Badge>
              <Badge count={0} showZero>
                <a href="#" className="head-example" />
              </Badge>
            </div>
          </Col>
        </Row>
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
