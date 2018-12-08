---
order: 1
title:
  zh-CN: 抽屉方向
  en-US: basic usage
desc:
  zh-CN:
  en-US:
---

## zh-CN

可以改变抽屉方向。

## en-US

The most basic usage

```jsx
import { Drawer, Button } from 'td-ui';
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftOpen: false,
      topOpen: false,
      rightOpen: false,
      bottomOpen: false
    }
  }

  toggle = key => {
    return e => {
      const visible = this.state[key];
      this.setState({
        [key]: !visible
      })
    }
  }

  render() {
    const { leftOpen, topOpen, rightOpen, bottomOpen } = this.state;
    return (<div>
      <Drawer placement="left" isOpen={leftOpen} onClose={this.toggle('leftOpen')}>
        <Button onClick={this.toggle('leftOpen')}>leftOpen</Button>
      </Drawer>
      <Drawer placement="right" isOpen={rightOpen} onClose={this.toggle('rightOpen')}>
        <Button onClick={this.toggle('rightOpen')}>rightOpen</Button>
      </Drawer>
      <Drawer placement="top" isOpen={topOpen} onClose={this.toggle('topOpen')}>
        <Button onClick={this.toggle('topOpen')}>topOpen</Button>
      </Drawer>
      <Drawer placement="bottom" isOpen={bottomOpen} onClose={this.toggle('bottomOpen')}>
        <Button onClick={this.toggle('bottomOpen')}>bottomOpen</Button>
      </Drawer>
      <Button onClick={this.toggle('leftOpen')} style={{marginRight: 10}}>左侧抽屉</Button>
      <Button onClick={this.toggle('rightOpen')} style={{marginRight: 10}}>右侧抽屉</Button>
      <Button onClick={this.toggle('topOpen')} style={{marginRight: 10}}>顶部抽屉</Button>
      <Button onClick={this.toggle('bottomOpen')}>底部抽屉</Button>
    </div>);
  }
}
ReactDOM.render(
    <Demo />
, MOUNT_NODE);
```
