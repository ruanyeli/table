---
category: Components
type: Data Entry
title: Select
subtitle: 选择器
---

选择器

## API
### Select props
参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----|
value | 指定当前选中的条目 | string | -
isNull | 当有待选字段存在且待选字段中找不到value值时，是否自动执行onChange(undefined)置空value值 | boolean | false
defaultValue | 指定默认选中的条目 | string | -
onChange | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 | function(value) | -
onSearch | 输入搜索文本的时候调用 | function(value) | 无 |
placeholder | 选择框默认文字 | string | -
size | 选择框大小，可选 large small | string | default
showSearch | 使单选模式可搜索，可设置为对象，搜索弹出的选择框是否对齐输入框 | boolean\|(object: {inputMatchWidth: true}) | false
disabled | 是否禁用 | boolean | false
mode | 设置 Select 的模式 | 'multiple' ｜ 'combobox' | －
filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | boolean or function(inputValue, option) | 无 |
dropdownStyle | 弹出选择框样式 | object | -
isPage | 是否可翻页（未来版本将会弃用，请使用新属性 pagination 代替） | object({visibleCount: 10}) | -
pagination | 是否可翻页，部分配置可参考 [pagination](/components/pagination/)，设为 false 时不进行分页 | boolean\|object | false
overflow | 在多选模式下，若为 `clip`，超过一行被裁剪， 若为 `ellipsis`，超过一行的部分会被裁剪，而且在行尾显示 `...` 提示，默认为 `false` | false \| 'ellipsis' \| 'clip' | false


### Option props
参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----|
value | value | string | -

### OptGroup props
参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----|
label | 组名 | string | 无

### pagination
参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----|
total | 数据总数 | number | 0
pageSize | 每页条数	 | number | 10
onChange | 页码改变的回调，参数是改变后的页码及每页条数	 | Function(page, pageSize)	| noop
current | 当前页数 | number	| 1
defaultCurrent | 默认当前页数	 | number	| -
