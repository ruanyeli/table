---
category: Components
type: Data Display
title: Carousel
subtitle: 跑马灯
---

旋转木马，一组轮播的区域。


## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

## API

### Collapse

| 参数             | 说明               | 类型                  | 默认值   |
|-----------------|-------------------|-----------------------|-------- |
| loop            | 是否循环滚动        | boolean               | false   |
| auto            | 是否自动滚动        | boolean               | false   |
| axis            | 滚动方向            | string ('x' 或者 'y') | x       |
| interval        | 自动滚动间隔时间     | number                | 5000    |
| duration        | 滚动速度（单位：毫秒）| number                | 300     |
| prevAndNext     | 是否显示上下按钮     | boolean               | false   |
| defaultActiveKey | 初始化选中的 key，如果没有设置 activeKey，从0开始  | number | 0  |
| activeKey | 当前选中的key，受控组件时使用，从0开始     | number  | -  |
| onChange     | 面板切换时调用 | function(preKey, nextKey)      | 无  |
| instance     | 组件实例，包含 next() 和 pre() 方法， 控制跳转上一张和下一张  | function({next, pre})      | 无  |
