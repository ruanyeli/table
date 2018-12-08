---
category: Components
type: Navigation
title: Dropdown
subtitle: 下拉菜单
order: 2
---

向下弹出的列表。

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

## API
Dropdown 的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
trigger | 触发下拉的行为 | string:`click` `hover`  | hover
placement | 菜单弹出位置：bottomLeft `bottomCenter` `bottomRight` `topLeft` `topCenter` `topRight` | string | `bottomLeft`
defaultVisible | 初始菜单是否显示 | boolean | - |
visible | 菜单是否显示 | boolean | - |
onVisibleChange | 菜单显示状态改变时调用，参数为 visible | Function(visible) | - |
overlayClassName | 弹出层包裹类 | String | 无 |
getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 | Function(triggerNode) | () => document.body |
