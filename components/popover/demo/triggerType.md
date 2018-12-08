---
order: 1
title:
  zh-CN: 两种触发方式
  en-US: Two ways to trigger
---

## zh-CN

鼠标移入, 点击。

## en-US

Mouse to click, focus and move in.

````jsx
import { Popover, Button } from 'td-ui';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

ReactDOM.render(
  <div>
    <Popover content={content} title="Title" trigger="hover">
      <Button>Hover me</Button>
    </Popover>
    &nbsp;
    &nbsp;
    &nbsp;
    <Popover content={content} title="Title" trigger="click">
      <Button>Click me</Button>
    </Popover>
  </div>
, mountNode);
````
