---
order: 0
title:
  zh-CN: 基本用法
  en-US: basic usage
desc:
  zh-CN:
  en-US:
---

## zh-CN

最基本用法。

## en-US

The most basic usage

```jsx
import { Drawer, Button } from 'td-ui';
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }
  open = e => {
    this.setState({
      isOpen: true
    })
  }
  close = e => {
    this.setState({
      isOpen: false
    })
  }
  render() {
    const { isOpen } = this.state;
    return <div>
      <Drawer isOpen={isOpen} onClose={this.close}>
        <div style={{padding: 20}}>
          <h2>基本用法</h2>
          <p>这是抽屉内容</p>
        </div>
      </Drawer>
      <Button type="primary" onClick={this.open}>打开抽屉</Button>
    </div>
  }
}
ReactDOM.render(
    <Demo />
, MOUNT_NODE);
```
