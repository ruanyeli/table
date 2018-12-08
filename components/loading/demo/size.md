---
order: 1
title:
  zh-CN: 组件尺寸
  en-US: Type
desc:
  zh-CN: 组件有大、中、小三种尺寸
  en-US: Type
---

## zh-CN

通过设置 size 为 large、small 分别把组件设为大、小尺寸。若不设置 size，则尺寸为中。

## en-US

Set the size to large or small by setting size to large small. If you do not set size, the size is medium


```jsx
import {Loading} from 'td-ui';

ReactDOM.render(
    <div>
        <Loading size="small">
          <div style={{padding: 50, textAlign: 'center', background: '#eee'}}>loading Content</div>
        </Loading>
        <Loading >
          <div style={{padding: 50, textAlign: 'center', background: '#eee'}}>loading Content</div>
        </Loading>
        <Loading size="large">
          <div style={{padding: 50, textAlign: 'center', background: '#eee'}}>loading Content</div>
        </Loading>
    </div>, mountNode);
```
<style>
.content-demo-inner>div>div{
display:inline-block;
}
</style>
