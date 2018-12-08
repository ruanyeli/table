---
order: 1
title:
  zh-CN: 区块间隔
  en-US: Grid Gutter
---

## zh-CN

栅格常常需要和间隔进行配合，你可以使用 `Row` 的 `gutter` 属性。

## en-US

````jsx
import { Row, Col } from 'td-ui';

ReactDOM.render(
  <div className="gutter-example gutter-demo">
    <Row gutter={16}>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">col-6</div>
      </Col>
    </Row>
  </div>
, mountNode);
````

````css
.gutter-example .ant-row > div {
  background: transparent;
  border: 0;
}
.gutter-box {
  background: #00A0E9;
  padding: 5px 0;
}
````
