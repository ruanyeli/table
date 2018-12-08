---
category: Components
type: Data Display
title: Collapse
subtitle: 折叠面板
---

可以折叠/展开的内容区域。


## 何时使用

- 对复杂区域进行分组和隐藏，保持页面的整洁。
- `手风琴` 是一种特殊的折叠面板，只允许单个内容区域展开。

## API

### Collapse

| 参数             | 说明                                         | 类型     | 默认值                          |
|------------------|----------------------------------------------|----------|---------------------------------|
| activeKey        | 当前激活 tab 面板的 key| string[]\|string   | 默认无，accordion模式下默认第一个元素|
| defaultActiveKey | 初始化选中面板的 key | string   | 无 |
| onChange         | 切换面板的回调                               | Function | 无                              |
| accordion        | 是否为手风琴模式，只能打开一个面板              | boolean | false                             |


### Collapse.Panel

| 参数          |  说明            | 类型                    | 默认值 |
|--------------|----------------- |------------------------|--------|
| onItemClick  | 被点击时回调函数   | function                | 无     |
| header       | 面板头内容        | string\|ReactNode       | 无     |
| disabled     | 禁用后的面板展开与否将无法通过用户交互改变 | boolean | false |
