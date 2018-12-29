---
order: 2
title:
  zh-CN: 输入框尺寸
  en-US: Type
desc:
  zh-CN: 输入框有大、中、小三种尺寸
  en-US: Type
---

## zh-CN

通过设置 size 为 large small 分别把输入框设为大、小尺寸。高度分别为 32px、30px 和 28px。若不设置 size，则尺寸为中。

## en-US


```jsx
import { Input } from 'td-ui';

const style ={width: 200, marginRight: 20}

ReactDOM.render(
  <div className="example-input">
    <Input size="large" placeholder="large size" style={style}/>
    <Input placeholder="default size" style={style}/>
    <Input size="small" placeholder="small size" style={style}/>
  </div>
, mountNode);
```