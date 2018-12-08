---
order: 3
title:
  zh-CN: 信息提示
  en-US: Type
desc:
  zh-CN: 各种类型的信息提示，只提供一个按钮用于关闭。
  en-US: Type
---

## zh-CN

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Button, Dialog } from 'td-ui';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  onConfirm = () => {
    Dialog.confirm({
      title: '你确认这个是xxx?',
      content: '确认之后我们会关闭此弹出框，请xxxx',
      onOk: () => {
        console.log('ok');
      },
      onCancel: () => {
        console.log('cancel');
      }
    });
  }

  onSuccess = () => {
    Dialog.success({
      title: '你确认这个是xxx?',
      content: '确认之后我们会关闭此弹出框，请xxxx'
    });
  }

  onError = () => {
    Dialog.error({
      title: '你确认这个是xxx?',
      content: '确认之后我们会关闭此弹出框，请xxxx'
    });
  }

  onWarning = () => {
    Dialog.warning({
      title: '你确认这个是xxx?',
      content: '确认之后我们会关闭此弹出框，请xxxx'
    });
  }

  render() {
    return <div>
      <Button style={{marginLeft: 10}} onClick={ this.onConfirm }>confirm</Button>
      <Button style={{marginLeft: 10}} onClick={ this.onSuccess }>success</Button>
      <Button style={{marginLeft: 10}} onClick={ this.onError }>error</Button>
      <Button style={{marginLeft: 10}} onClick={ this.onWarning }>warning</Button>
    </div>
  }
}

ReactDOM.render(<Demo />, mountNode);
```
