---
category: Components
type: Data Display
title: Tooltip
subtitle: 文字提示
---

简单的文字提示气泡框。


## API


属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
| placement | 气泡框位置，可选 `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string     | right    |
| defaultVisible   | 默认浮层显示                     | boolean       | false  |
| visible   | 用于手动控制浮层显隐                     | boolean       | false  |
| onVisibleChange | 显示隐藏的回调                      | (visible) => void | 无     |
| mouseEnterDelay | 鼠标移入后延时多少才显示 Tooltip，单位：秒 | number | 0 |
| mouseLeaveDelay | 鼠标移出后延时多少才隐藏 Tooltip，单位：秒 | number | 0.1 |
| trigger   | 触发行为，可选 `hover/click`       | string        | hover  |
| contentClassName | 卡片类名                            | string | 无     |
| contentStyle | 卡片样式                            | object | 无     |
| title     | 卡片标题,不穿`content`,则title里的内容当做卡片`content`                     | string\|ReactNode | 无     |
| content   | 卡片内容                            | string\|React.Element\|()=> React.Element| 无     |
| destroyPopupOnHide |卡片隐藏的时候是否摧毁卡片dom | boolean | false |
| maxHeight |卡片纵向最大高度，如果不设置该项，则卡片内容没有最大高度，如果设置了该项，溢出部分将滚动显示 | number |  |
## 注意

请确保 `Tooltip` 的子元素能接受 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件。
