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
import { Upload } from 'td-ui';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: ''
    }
  }
  handleChange = file => {
    this.setState({
      fileList: file
    })
  }
  handleClick = () => {
    console.log(this.state.fileList);
  }
  render() {
    return (
      <div>
        <Upload accept='xls' note='单个文件' fileList={this.state.fileList} onChange={this.handleChange}/>
        <div onClick={this.handleClick}>点击获得fileList</div>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
