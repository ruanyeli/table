---
category: Components
type: Navigation
title: Steps
subtitle: 步骤条
order: 5
---

引导用户按照流程完成任务的导航条。

当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

## API
Steps 的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
mode | 设置步骤条类型，可选值为 `mini` `vertical` `horizontal` | string | horizontal
current | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 `status` 属性覆盖状态 | number | 0 |


Steps.Step 的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
title | 标题 | string\|ReactNode | -     
desc | 步骤的详情描述，可选 | string\|ReactNode | -  
icon | 步骤图标的类型，可选 | string\|ReactNode | -
iconsize| icon的大小      | number |  20
