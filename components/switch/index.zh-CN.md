---
category: Components
type: Data Entry
title: Switch
subtitle: 开关
---

用于管理状态的切换。

## API
参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----|
value | 指定当前是否选中 | boolean | false
defaultValue | 初始是否选中 | boolean | false
onChange | 变化时回调函数 | Function(value:Boolean) | -
checkedChildren | 选中时的内容 | string｜ReactNode | -
unCheckedChildren | 非选中时的内容 | string｜ReactNode | -
size | 开关大小，可选值：`default` `small` | string | default
disabled | 是否禁用 | boolean | false
