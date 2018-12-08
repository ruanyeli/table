---
category: High
type:
title: WebShell
subtitle: 在线终端
---

在线版终端组件，通过websocket与后端交互，基于xterm.js实现。socket后端代码参考[xterm/demo](https://github.com/xtermjs/xterm.js/blob/master/demo/server.js)。


## API

WebShell

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
socketURL | 服务端socket地址 | String	| -
socket  | sock实例，使用socket就不需要socketURL | object | -
onOpen  | socket连接打开时的回调方法 | function | -
onError	| socket错误时的回调方法 | function | -
onClose | 查询完回调 |	function | -
options | 见xterm.js的配置文档 | object | { cursorBlink: true }
