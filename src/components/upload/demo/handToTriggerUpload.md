---
order: 3
title:
  zh-CN: 手动触发上传动作
  en-US: basic usage
desc:
  zh-CN: 
  en-US: 
---

## zh-CN

onChange后手动触发上传动作

## en-US



```jsx
import { Upload, Button } from 'td-ui';

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
          ref={u => this.uploader = u}
          multiple
          note='请选择需要上传的文件'
          showType="name"
          fileList={this.state.fileList}
          onChange={this.handleChange}
          onChangeToUpload={false}
          event={{
            onProgress: e => console.log(e),
            onSuccess: e => console.log(e),
            onError: e => console.error(e)
          }}
          showProgress={true}
          action="http://jsonplaceholder.typicode.com/posts/"
        />

        <Button onClick={() => this.uploader.uploadAction()}>点击上传</Button>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```


