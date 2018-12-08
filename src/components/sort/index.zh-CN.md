---
category: Components
type: Data Entry
title: Sort
subtitle: 排序
---

数据拖拽排序

## API
Sort 的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
value | 组件值 | array | []
defaultValue | 默认值 | array | []
onChange | 数据修改回调 | function | -
sortHandle | 拖拽触发class | string | 'item' |
direction | 限制拖动顺序，可设置`vertical` or `horizontal` | boolean\|string | 'vertical' |

Sort.SortItem 的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
sortData | 一条数据值 | string\|object | -     
