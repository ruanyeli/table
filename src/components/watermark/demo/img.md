---
order: 0
title:
  zh-CN: 图片水印
  en-US: basic usage
desc:
  zh-CN: 图片水印
  en-US: basic pagination
---

## zh-CN

图片水印

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Watermark, Select } from 'td-ui';
const Option = Select.Option;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'http://img61.ddimg.cn/upload_img/00451/wenjian1/NIKE.jpg',
      list: [{
          name: 'nike',
          value: 'http://img61.ddimg.cn/upload_img/00451/wenjian1/NIKE.jpg'
        }, {
          name: 'adress',
          value:'http://img60.ddimg.cn/upload_img/00451/wenjian1/adidas.jpg'
        }, {
          name: 'xxxx',
          value: 'http://img57.ddimg.cn/111810013897097_y.jpg'
        }]
    }
  }

  render() {
    const { text, list } = this.state;
    return (
      <div>
        <Select value={text} onChange={value => { this.setState({text: value}) }} style={{width: 200, marginBottom: 15}}>
          {
            list.map(item => <Option key={item.value} value={item.value}>{item.name}</Option>)
          }
        </Select>
        <Watermark img={text}>
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
