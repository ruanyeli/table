---
category: Components
type: Feedback
title: Loading
subtitle: 加载中
---

用于页面和区块的加载中状态。

页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

## API

通过设置 Loading 的属性来产生不同的组件样式

组件的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
text | 当作为包裹元素时，可以自定义描述文案|string|-
loading|是否旋转|boolean|true
size | 设置组件的大小，可选值为 `small` `default` `large` | string | `'default'`
