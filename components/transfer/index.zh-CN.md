---
category: Components
type: Data Entry
title: Transfer
subtitle: 穿梭框
---

双栏穿梭选择框。
用直观的方式在两栏中移动元素，完成选择行为。
选择一个或以上的选项后，点击对应的方向键，可以把选中的选项移动到另一栏。 其中，左边一栏为 source，右边一栏为 target，API 的设计也反应了这两个概念。


## API


属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
| titles             | 标题集合，顺序从左至右    | string[]     | ['', '']    |
| dataSource         | 数据源，其中的数据将会被渲染到左边一栏中，`targetKeys` 中指定的除外。| array       | []  |
| notFoundContent    | 当列表为空时显示的内容    | string\|ReactNode| '列表为空'     |
| operations         | 操作文案集合，顺序从下至上 | string[]     | ['>', '<'] |
| defaultSourceSelectedKeys | 左侧选择框默认选中内容        | string[]     | [] |
| defaultTargetSelectedKeys | 右侧选择框默认选中内容        | string[]     | [] |
| sourceSelectedKeys | 左侧选择框选中内容        | string[]     | [] |
| targetSelectedKeys | 右侧选择框选中内容        | string[]     | [] |
| onSourceSelectedKeys | 左侧选择框选中内容修改        | (value): sourceSelectedKeys     | [] |
| onTargetSelectedKeys | 右侧选择框选中内容修改        | (value): targetSelectedKeys    | [] |
| sourceDisabledKeys | 左侧禁止选中内容(不建议用于多层级的穿梭框)        | string[]     | [] |
| targetDisabledKeys | 右侧禁止选中内容(不建议用于多层级的穿梭框)        | string[]     | [] |
| value              | 穿梭框的值               | string[]        | []  |
| defaultValue       | 穿梭框默认值               | string[]        | []  |
| onChange           | 穿梭框的值变化的回调函数   | (value): void | 无     |
| render             | 自定义渲染函数   | function | 无     |
| height             | 穿梭框总高度     | number  | 500 |
