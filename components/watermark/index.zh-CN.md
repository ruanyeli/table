---
category: Components
type: Navigation
title: Watermark
subtitle: 水印
---

进行标记和分类的小标签

## API

Watermark

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
text | 水印文本 | string	| ""
img  | 水印图片 | string	| ""
color| 文本颜色 | string	| #eee
font | 字体    | string    | "italic 14px 'Microsoft YaHei'"
rotate| 旋转角度 | number	| -20
width| 间距宽度 | number	| 200
height| 间距高度 | number	| 150
type | 水印类型，foreground为前景水印，background为背景水印 | string | "foreground"
size | 水印覆盖大小 | [ number || string, number || string ] | [ '100%', '100%' ]
