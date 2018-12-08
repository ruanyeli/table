---
order: 2
title:
  zh-CN: 触发上传
  en-US: basic usage
desc:
  zh-CN: 选择文件后立即上传
  en-US: basic pagination
---

## zh-CN

onChange 触发上传动作

## en-US

```jsx
import { Upload } from 'td-ui';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
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
        <Upload
          multiple
          note='请选择需要上传的文件'
          showType="name"
          fileList={this.state.fileList}
          onChange={this.handleChange}
          onChangeToUpload={true}
          event={{
            onProgress: e => console.log(e),
            onSuccess: e => console.log(e),
            onError: e => console.error(e)
          }}
          showProgress={true}
          action="http://jsonplaceholder.typicode.com/posts/"
        />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```


