---
category: Components
subtitle: 图标
type: General
title: Icon
---

语义化的矢量图形。

## 如何使用

使用 `<Icon />` 标签声明组件，指定图标对应的 type 属性，示例代码如下:

```html
<Icon type="link" />
```
## 图标列表

> 点击图标复制代码。

### 方向性图标

```__react
import IconSet from '../../src/theme/template/IconSet';
ReactDOM.render(<IconSet className="icons" catigory="direction" />, mountNode);
```

### 提示建议性图标

```__react
import IconSet from '../../src/theme/template/IconSet';
ReactDOM.render(<IconSet className="icons" catigory="suggestion" />, mountNode);
```

### 网站通用图标

```__react
import IconSet from '../../src/theme/template/IconSet';
ReactDOM.render(<IconSet className="icons" catigory="other" />, mountNode);
```

## API

由于图标字体本质上还是文字，可以使用 `style` 和 `className` 设置图标的大小和颜色。

```jsx
<Icon type="question" style={{ fontSize: 16, color: '#08c' }} />
```

| 参数      | 说明             | 类型      | 默认值  |
|----------|------------------|----------|--------|
| type | 图标类型 | string | - |
| style | 设置图标的样式，例如 fontSize 和 color | object | - |
