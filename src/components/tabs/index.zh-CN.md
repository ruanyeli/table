---
category: Components
type: Data Display
title: Tabs
subtitle: 标签页
---

提供平级的区域将大块内容进行收纳和展现，保持界面整洁。


标准线条式页签，用于容器内部的主功能切换，这是最常用的 Tabs。


## API

Tabs

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
activeKey | 当前激活 tab 面板的 key | string | -
defaultActiveKey | 初始化选中面板的 key，如果没有设置 activeKey | string | 第一个面板
onChange | 切换面板的回调 | Function | -
animated | 是否使用动画切换Tabs | bool  | true
tabBarStyle | tab bar 的样式对象  |  object  | -
tabBarPosition | 页签位置，可选值有 `top` `right` `bottom` `left`  | string  |  'top'
type  |  页签的基本样式，可选 `line` `card` 类型 |  string |  'line'
onRemove  | 删除页签的回调  | (targetKey): void  | 无
onNextClick  | next 按钮被点击的回调  |  Function |  无
onPrevClick	  |  prev 按钮被点击的回调 |  Function |  无
onTabClick  | tab 被点击的回调  | Function  |  无
destroyInactiveTabPane  | 被隐藏时是否不渲染 DOM 结构  |  boolean |  false
titleEditable  | tab标题是否可以编辑  |  boolean |  false
onTabTitleChange  | 标题可编辑时，返回新标题及key |  function(key, title) |  null

Tabs.TabPane

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
tab | 选项卡头显示文字 | string | -
key | 对应 activeKey | string | -
forceRender  | 被隐藏时是否渲染 DOM 结构  | boolean  |  false
disabled | 是否禁用  | boolean |  false
