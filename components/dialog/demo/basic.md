---
order: 0
title:
  zh-CN: 基本用法
  en-US: Type
desc:
  zh-CN: 第一个对话框。
  en-US: Type
---

## zh-CN

打开对话框后，将在3s进入确认按钮 loading 状态，对话框将在打开5s后关闭；
## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Button, Dialog } from 'td-ui';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      congirmLoading: false,
    }
  }
  openDialog = () => {
    this.setState({visible: true});
    setTimeout(() => {
      this.setState({
        congirmLoading: true
      })
    }, 3000);
    setTimeout(() => {
      this.setState({
        visible: false,
        congirmLoading: false
      })
    }, 5000);
  }
  render() {
    return <div>
      <Button style={{marginLeft: 10}} onClick={this.openDialog}>打开弹窗</Button>
      <Dialog
        title="这里是标题"
        onOk={() => {
          this.setState({visible: false});
          console.log('ok');
        }}
        onCancel={() => {
          this.setState({visible: false});
          console.log('cancel');
        }}
        visible={this.state.visible}
        maskClosable={false}
        confirmLoading={this.state.congirmLoading}
      >
        <p>这里是弹窗内容</p>
        <p>这里是弹窗内容</p>
        <p>这里是弹窗内容</p>
      </Dialog>
    </div>
  }
}

ReactDOM.render(<Demo />, mountNode);
```
