---
order: 7
title:
  zh-CN: 搜索框
  en-US:
desc:
  zh-CN: 输入框按回车或者点击按钮搜索
  en-US:
---

## zh-CN

## en-US

```jsx
import { Input } from 'td-ui';
const Search = Input.Search;

ReactDOM.render(
  <Search
    placeholder="input search text"
    style={{ width: 200 }}
    onSearch={value => console.log(value)}
  />
, mountNode);

```