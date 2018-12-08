---
category: Components
type: Data Entry
title: AutoComplete
subtitle: 自动完成
---

输入框自动完成功能。
需要自动完成时。

## API

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
| allowClear | 支持清除, 单选模式有效 | boolean | false |
| dataSource | 自动完成的数据源 | \[string\]\|\[<{value: string, text: string}>\] |  |
| defaultValue | 指定默认选中的条目 | string | 无 |
| optionLabelProp | 回填到选择框的 Option 的属性值，默认是 `value`，还可设置为`text`。 | string | `value` |
| value | 指定当前选中的条目 | string | 无 |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | function(value) | 无 |
| onSearch | 搜索补全项的时候调用 | function(value) | 无 |
| onSelect | 被选中时调用，参数为选中项的 value 值 | function(value, option) | 无 |
| placeholder | 选择框默认文字 | string | -
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | boolean or function(inputValue, option) | 无 |