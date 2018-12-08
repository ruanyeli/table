---
category: Components
type: Data Entry
title: InputNumber
subtitle: 数字输入框
---

通过鼠标或键盘，输入范围内的数值。

当需要获取标准数值时。

## API
通过设置 Input-Number 的属性来产生不同的数字输入框样式，推荐顺序为：`size` -> `disabled`


数字输入框的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
size | 设置输入框大小，可选值为 `small` `large` 或者不设 | string | `default`
onClick | `click` 事件的 handler | function | -
defaultValue | 初始值 | number | -
min | 最小值 | number | -Infinity
max | 最大值 | number | Infinity
step | 每次改变步数，可以为小数 | number／string | 1
onChange | 变化回调	 | Function(value: number | string) | 1
`<InputNumber/>` 最终会被渲染为 `<input />`，并且除了上表中的属性，其它属性都会直接传到 `<input />`。
