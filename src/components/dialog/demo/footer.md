---
order: 2
title:
  zh-CN: 自定义页脚
  en-US: Type
desc:
  zh-CN: 不需要默认确定取消按钮时，你可以把 footer 设为 null。
  en-US: Type
---

## zh-CN
更复杂的例子，自定义了页脚的按钮，点击提交后进入 loading 状态，完成后关闭。

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
      <Button style={{marginLeft: 10}} onClick={() => this.setState({visible: true})}>自定义footer</Button>
      <Dialog
        title="弹窗-自定义footer"
        onOk={() => {
          this.setState({visible: false});
          console.log('ok');
        }}
        onCancel={() => {
          this.setState({visible: false});
          console.log('cancel');
        }}
        visible={this.state.visible}
        footer="xx"
        width="400px"
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
