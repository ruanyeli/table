---
category: Components
type: Feedback
title: Drawer
subtitle: 抽屉栏
---

抽屉滑动方式展示内容。

## API

| 参数      | 说明                              | 类型              |  可选值  | 默认值 |
|-----------|-----------------------------------|-----------------|---------|--------|
| isOpen    | 是否打开抽屉                        | boolean         |         | false  |
| mask      | 是否显示遮罩                        | boolean         |         | true   |
| onClose   | 点击遮罩关闭抽屉函数，若不传递，点击遮罩不关闭    | function |        | -    |
| placement | 抽屉方向                           | string |  `left`、`right`、`top`、`bottom`   | 'right'  |
| width     | 抽屉宽度，当placement为`left`或`right`时生效          | number |        |  200  |
| height    | 抽屉高度，当placement为`top`或`bottom`时生效          | number |        |  200  |
| drawerStyle    | 抽屉样式                      | object |        |  {}  |
| drawerClassName| 抽屉包裹容器类名               | string |        |  -  |
| container| 渲染容器               | DOM |        |  document.body  |
