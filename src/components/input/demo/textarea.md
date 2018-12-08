---
order: 5
title:
  zh-CN: 适应文本高度的文本域
  en-US: Type
desc:
  zh-CN: autosize 属性适用于 textarea 节点，并且只有高度会自动变化。另外 autosize 可以设定为一个对象，指定最小行数和最大行数。
  en-US: Type
---

## zh-CN

## en-US

```jsx
import { Input } from 'td-ui';
const Textarea = Input.Textarea;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '这是一段文字'
    }
  }
  onChange = e => {
    this.setState({value: e.target.value});
  }
  render() {
    const { value } = this.state;
    return (
      <div>
        <Textarea placeholder='请输入' autoSize value={value} onChange={this.onChange}/>
        <Textarea placeholder='请输入' defaultValue='这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字' autoSize={{minRows: 2, maxRows: 6}}/>
        <Textarea placeholder='请输入' rows={4}/>
      </div>
    )
  }
}

ReactDOM.render(<Demo/>, mountNode);
```
