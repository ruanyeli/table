---
category: Components
type: Feedback
title: Progress
subtitle: 进度条
---

展示操作的当前进度。

## API

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
type | 类型,可选 line circle stripe | string | line
percent | 百分比 | number |	0
status | 状态,可选：success exception warning | string	| normal
width | line/stripe 长度 min:180,circle  直径 min:80 长度 ，单位 px |number | line/stripe:280 
height | 控制进度条粗细，单位 px |number | 8
targetStatus | 目标状态,可选：success exception warning | string | normal
targetPercent | 目标百分比 | number | 0
targetType | 目标类型,可选：line stripe | string | line
showInfo | 是否显示进度数值或状态图标 | boolean | true
showPercent | 设置status后是否显示进度数值 | boolean | true
circle:120
