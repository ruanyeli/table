---
category: Components
type: Feedback
title: Message
subtitle: 消息提示
---

全局展示操作反馈信息。

可提供成功、警告和错误等反馈信息。

顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

## API

组件提供了一些静态方法，使用方式和参数如下：

`message.info(content, duration)`

`message.success(content, duration)`

`message.error(content, duration)`

`message.warning(content, duration)`


按钮的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
content | 提示内容 | string | -
duration | 自动关闭的延时，单位秒 | number | 2
