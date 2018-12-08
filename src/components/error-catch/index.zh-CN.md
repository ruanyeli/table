---
category: High
type: Data Entry
title: ErrorCatch
subtitle: 错误捕获
---

捕获组件内部错误。

## ErrorCatch(component)

使用方式如下：

```jsx
class ErrorComponent extends React.Component {}
class CustomizedComponent extends React.Component {}

CustomizedComponent = ErrorCatch(ErrorComponent)(CustomizedComponent);
```
or
```jsx
class ErrorComponent extends React.Component {}

@ErrorCatch(ErrorComponent)
class CustomizedComponent extends React.Component {}
```

## API

| 参数        | 说明                                                      | 类型        | 默认值 |
|----------- |---------------------------------------------------------  | ---------- |-------|
| ErrorComponent       | 错误展示component，入参(error, errorInfo)   | ReactNode     | 有