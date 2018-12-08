import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from '../../grid';
import Icon from '../../icon';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  let Grade = require('../index').default;
  function Demo() {
    return (
      <div className="td">
        <Row>
          <Col span={6}><Grade /></Col>
          <Col span={6}>
            <div>
              <Grade character={<Icon type="heart" />} allowHalf />
              <br />
              <Grade character="A" allowHalf style={{ fontSize: 36 }} />
              <br />
              <Grade character="好" allowHalf />
            </div>
          </Col>
          <Col span={6}>
            <div>
              <Grade defaultValue={3} /> allowClear: true
              <br />
              <Grade allowClear={false} defaultValue={3} /> allowClear: false
            </div>
          </Col>
          <Col span={6}><Grade allowHalf defaultValue={2.5} /></Col>
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