---
category: Components
type: Data Entry
title: Input
subtitle: 输入框
---

通过鼠标或键盘输入内容，是最基础的表单域的包装。

需要用户输入表单域内容时。
提供组合型输入框，带搜索的输入框，还可以进行大小选择。

## API

通过设置 Input 的属性来产生不同的输入框样式，推荐顺序为：`size` -> `disabled`

输入框的属性说明如下：

### input
属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
size | 设置输入框大小，可选值为 `small` `large` 或者不设 | string | `default`
onClick | `click` 事件的 handler | function | -
defaultValue | 设置输入框默认值 | string | -
value | 输入框内容 | string | -
addonBefore | 带标签的 input，设置输入框前置标签| string/ReactNode |
addAfter | 带标签的 input，设置输入框后置标签 | string/ReactNode |
prefix | 带有前缀图标的 input | string/ReactNode  |
suffix | 带有后缀图标的 input | string/ReactNode  |

`<Input/>` 最终会被渲染为 `<input />`，并且除了上表中的属性，其它属性都会直接传到 `<input />`。

### Input.Textarea
属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
defaultValue | 设置输入框默认值 | string | -
value | 输入框内容 | string | -
autoSize | 自适应内容高度，可设置为 `true|false` 或对象：`{ minRows: 2, maxRows: 6 }` | boolean/object | false

### Input.Search
属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
onSearch | 点击搜索或按下回车键时的回调 | function(value) | -

### Input.Group
属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
size | `Input.Group` 中所有的 `Input` 的大小，可选 `large` `default` `small` | string | default
compact | 是否紧凑模式 | boolean | false
