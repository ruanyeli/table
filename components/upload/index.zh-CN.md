---
category: Components
type: Data Entry
title: Upload
subtitle: 上传
---

文件选择上传

## API
参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----|
accept | 接受文件类型 | string｜string[] | ''
multiple | 是否可选择多个文件|boolean | false
fileList | 文件列表 | string｜array | ''
note | 提示文字 | string | ''
onChange | 上传文件改变时的状态 | Function(fileList) | noop
showType | 文件列表展示内容的类型 | string:`path` `name` | `path`
onChangeToUpload | 是否选中文件后直接上传 | boolean | false |
event | 上传时间，包含 `onSuccess`、`onError`、 `onProgress` | object | {} |
headers | 上传请求 header | object | {} |
data | 上传请求数据| object | {} |
action | 上传url | string | '/' |
filename | 上传文件的name值 | string | 'file' |
withCredentials | 上传是否携带cookie | boolean | true |
showProgress | 是否显示进度条 | boolean | false |