---
order: 1
title:
  zh-CN: 位置
  en-US: Placement
---

## zh-CN

位置有 12 个方向。

## en-US

The ToolTip has 12 placements choice.

````jsx
import { Tooltip } from 'td-ui';
const text = <span>prompt text</span>;

ReactDOM.render(
  <div id="components-tooltip-demo-placement">
    <div style={{ marginLeft: 60 }}>
      <Tooltip placement="topLeft"
      content={text}>
        <a href="#">TL</a>
      </Tooltip>
      <Tooltip placement="top" content={text}>
        <a href="#">Top</a>
      </Tooltip>
      <Tooltip placement="topRight" content={text}>
        <a href="#">TR</a>
      </Tooltip>
    </div>
    <div style={{ width: 60, float: 'left' }}>
      <Tooltip placement="leftTop" content={text}>
        <a href="#">LT</a>
      </Tooltip>
      <Tooltip placement="left" content={text}>
        <a href="#">Left</a>
      </Tooltip>
      <Tooltip placement="leftBottom" content={text}>
        <a href="#">LB</a>
      </Tooltip>
    </div>
    <div style={{ width: 60, marginLeft: 270 }}>
      <Tooltip placement="rightTop" content={text}>
        <a href="#">RT</a>
      </Tooltip>
      <Tooltip placement="right" content={text}>
        <a href="#">Right</a>
      </Tooltip>
      <Tooltip placement="rightBottom" content={text}>
        <a href="#">RB</a>
      </Tooltip>
    </div>
    <div style={{ marginLeft: 60, clear: 'both' }}>
      <Tooltip placement="bottomLeft" content={text}>
        <a href="#">BL</a>
      </Tooltip>
      <Tooltip placement="bottom" content={text}>
        <a href="#">Bottom</a>
      </Tooltip>
      <Tooltip placement="bottomRight" content={text}>
        <a href="#">BR</a>
      </Tooltip>
    </div>
  </div>
, mountNode);
````

<style>
#components-tooltip-demo-placement a {
  display: inline-block;
  line-height: 32px;
  height: 32px;
  width: 60px;
  font-size: 14px;
  text-align: center;
  background: #f5f5f5;
  margin-right: 1em;
  margin-bottom: 1em;
  border-radius: 6px;
}
</style>
