---
order: 5
title:
  zh-CN: 其他字符
  en-US: Other Character
---

## zh-CN

可以将星星替换为其他字符，比如字母，数字，字体图标甚至中文。

## en-US

Replace the default star to other character like alphabet, digit, iconfont or even Chinese word.

````jsx
import { Grade, Icon } from 'td-ui';

ReactDOM.render(
  <div>
    <Grade character={<Icon type="bars" />} allowHalf />
    <br />
    <Grade character="A" allowHalf style={{ fontSize: 36 }} />
    <br />
    <Grade character="好" allowHalf />
  </div>
, mountNode);
````