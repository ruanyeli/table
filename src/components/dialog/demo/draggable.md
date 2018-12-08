---
order: 1
title:
  zh-CN: 支持可拖动
  en-US: Type
desc:
  zh-CN: 注：仅有头部标题的弹出框可拖动
  en-US: Type
---

## zh-CN
设置draggablew为true后，弹出框的头部可拖动。
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

  render() {
    return <div>
      <Button style={{marginLeft: 10}} onClick={() => this.setState({visible: true})}>打开弹窗</Button>
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
        okText="确定-ok"
        cancelText="取消-cancel"
        maskClosable={false}
        draggable={true}
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
