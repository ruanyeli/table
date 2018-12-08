---
order: 0
title:
  zh-CN: 基本用法
  en-US: basic usage
desc:
  zh-CN: 基本
  en-US: basic pagination
---

## zh-CN

基本

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Watermark, Select } from 'td-ui';
const Option = Select.Option;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '水印水印',
      list: ['水印水印', '水印水印2', '水印水印3', '水印水印4']
    }
  }

  render() {
    const { text, list } = this.state;
    return (
      <div>
        <Select value={text} onChange={value => { this.setState({text: value}) }} style={{width: 200, marginBottom: 15}}>
          {
            list.map(item => <Option key={item} value={item}>{item}</Option>)
          }
        </Select>
        <Watermark text={text}>
          <p>文本信息，文本信息，文本信息，文本信息</p>
          <p>文本信息，文本信息，文本信息，文本信息</p>
          <p>文本信息，文本信息，文本信息，文本信息</p>
          <p>文本信息，文本信息，文本信息，文本信息</p>
          <p>文本信息，文本信息，文本信息，文本信息</p>
          <p>文本信息，文本信息，文本信息，文本信息</p>
          <p>文本信息，文本信息，文本信息，文本信息</p>
        </Watermark>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
