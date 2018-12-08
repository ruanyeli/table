---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
desc:
  zh-CN: 基本用法
  en-US: Basic usage
---

## zh-CN

基本标签的用法，可以通过添加 `closable` 变为可关闭标签。可关闭标签具有 `onClose` 事件。

## en-US

This is the basic usage of tag.It can be turned into a closable tag via adding `closable`,with `onClose` event.

```jsx
import { Tag } from 'td-ui';

function log(e) {
  console.log(e);
}

function preventDefault(e) {
  e.preventDefault();
  console.log('Clicked! But prevent default.');
}

ReactDOM.render(
  <div>
    <Tag>Tag 1</Tag>
    <Tag><a href="https://github.com/ant-design/ant-design/issues/1862">Link</a></Tag>
    <Tag closable onClose={log}>Tag 2</Tag>
    <Tag closable onClose={preventDefault}>Prevent Default</Tag>
  </div>,
  mountNode
);
```
