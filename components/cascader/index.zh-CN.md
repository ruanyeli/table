---
category: Components
type: Data Entry
title: Cascader
subtitle: 级联选择
---

需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。

从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。

比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。

## API

`<Cascader options={options} />`

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
options | 可选项数据源 | object | -
defaultValue | 默认的选中项 | array  |[] |
value | 指定选中项 | array | - |
onChange | 选择完成后的回调 | `(value, selectedOptions) => void` | - |
onInputChange | 搜索框键盘按下完成后的回调 | `(value) => void` | - |
className | 自定义类名 | string | - |
placeholder | 输入框占位文本 | string | '请选择'
size | 输入框大小，可选 `large` `default` `small` | string | `default` |
disabled | 禁用 | boolean | false |
allowClear | 是否支持清除 | boolean | true |
expandTrigger | 次级菜单的展开方式，可选 'click' 和 'hover' | string | 'click' |
showSearch | 在选择框中显示搜索框 | boolean | false |
loadData  | 动态加载选项 | `(selectedOptions) => void`  | - |
isPage | 是否可翻页 | object({visibleCount: 10}) | -
dropdownColumnStyle | 弹出选择框每一列样式 | object | -
