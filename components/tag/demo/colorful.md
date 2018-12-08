---
order: 2
title:
  zh-CN: 多彩标签
  en-US: colorful tags
desc:
  zh-CN: 预设颜色以及具体色值
  en-US: preseted colors & specific colors
---

## zh-CN

我们添加了多种预设色彩的标签样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。

## en-US

There are many preseted colors for different occasions.You can set more specific color.

```jsx
import { Tag } from 'td-ui';

ReactDOM.render(
  <div>
    <h4 style={{ marginBottom: 16 }}>Presets:</h4>
    <div>
      <Tag color="pink">pink</Tag>
      <Tag color="red">red</Tag>
      <Tag color="green">green</Tag>
      <Tag color="cyan">cyan</Tag>
      <Tag color="blue">blue</Tag>
      <Tag color="purple">purple</Tag>
    </div>
    <h4 style={{ margin: '16px 0' }}>Custom:</h4>
    <div>
      <Tag color="#f50" textColor="#000">#f50</Tag>
      <Tag color="#2db7f5">#2db7f5</Tag>
      <Tag color="#87d068">#87d068</Tag>
      <Tag color="#108ee9">#108ee9</Tag>
    </div>
  </div>
, mountNode);
```
