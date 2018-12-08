---
category: Components
type: Data Display
title: Tag
subtitle: 标签
---

进行标记和分类的小标签

## API

TAG

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
color | 标签色 | string	| -
closable | 标签是否可以关闭	 | boolean | false
onClose	| 关闭时的回调	 | (e) => void | -
afterClose | 关闭动画完成后的回调 |	() => void | -

Tag.CheckableTag

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
checked	| 设置标签的选中状态 | boolean | false
onChange | 点击标签时触发的回调	| (checked) => void | -
