---
order: 2
title:
  zh-CN: 日期格式
  en-US: Type
desc:
  zh-CN: 使用 format 属性，可以自定义日期显示格式。
  en-US: Type
---

## zh-CN

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { DatePicker, Row, Col } from 'td-ui';

ReactDOM.render(
  <div>
    <Row>
      <Col span={8}>
        <DatePicker format="YYYY-MM"/>
      </Col>
      <Col span={8}>
        <DatePicker format="YYYY-MM-DD"/>
      </Col>
      <Col span={8}>
        <DatePicker format="YYYY-MM-DD HH:mm:ss"/>
      </Col>
    </Row>
  </div>,
  mountNode
);
```
<style>
.td-btn {
  margin: 5px;
}
</style>
