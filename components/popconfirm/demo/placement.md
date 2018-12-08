---
order: 2
title:
  zh-CN: 位置
  en-US: Placement
---

## zh-CN

位置有十二个方向。

## en-US

There are 12 `placement` options available.

````jsx
import { Popconfirm, Button } from 'td-ui';

const text = <span>Title</span>;
const content = "Are you sure？";

const buttonWidth = 70;

ReactDOM.render(
  <div className="demo" id="components-Popconfirm-demo-placement">
    <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
      <Popconfirm placement="topLeft" content={content} trigger="click">
        <Button>TL</Button>
      </Popconfirm>
      <Popconfirm placement="top" content={content} trigger="click">
        <Button>Top</Button>
      </Popconfirm>
      <Popconfirm placement="topRight" content={content} trigger="click">
        <Button>TR</Button>
      </Popconfirm>
    </div>
    <div style={{ width: buttonWidth, float: 'left' }}>
      <Popconfirm placement="leftTop" content={content} trigger="click">
        <Button>LT</Button>
      </Popconfirm>
      <Popconfirm placement="left" content={content} trigger="click">
        <Button>Left</Button>
      </Popconfirm>
      <Popconfirm placement="leftBottom" content={content} trigger="click">
        <Button>LB</Button>
      </Popconfirm>
    </div>
    <div style={{ width: buttonWidth, marginLeft: (buttonWidth * 4) + 24 }}>
      <Popconfirm placement="rightTop" content={content} trigger="click">
        <Button>RT</Button>
      </Popconfirm>
      <Popconfirm placement="right" content={content} trigger="click">
        <Button>Right</Button>
      </Popconfirm>
      <Popconfirm placement="rightBottom" content={content} trigger="click">
        <Button>RB</Button>
      </Popconfirm>
    </div>
    <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
      <Popconfirm placement="bottomLeft" content={content} trigger="click">
        <Button>BL</Button>
      </Popconfirm>
      <Popconfirm placement="bottom" content={content} trigger="click">
        <Button>Bottom</Button>
      </Popconfirm>
      <Popconfirm placement="bottomRight" content={content} trigger="click">
        <Button>BR</Button>
      </Popconfirm>
    </div>
  </div>
, mountNode);
````

<style>
.code-box-demo .td-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}
#components-Popconfirm-demo-placement .td-btn {
  width: 70px;
  margin: 0 10px 10px 0;
}
</style>
