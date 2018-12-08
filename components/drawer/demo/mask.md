---
order: 0
title:
  zh-CN: 遮罩
  en-US: basic usage
desc:
  zh-CN:
  en-US:
---

## zh-CN

控制是否遮罩

## en-US

The most basic usage

```jsx
import { Drawer, Button, Radio } from 'td-ui';
const RadioGroup = Radio.RadioGroup;
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isMask: true
    }
  }
  toggleOpen = e => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  close = e => {
    this.setState({
      isOpen: false
    })
  }
  maskOnChange = v => {
    console.log(v);
    this.setState({
      isMask: v.target.value
    })
  }
  render() {
    const { isOpen, isMask } = this.state;
    return <div>
      <Drawer isOpen={isOpen} onClose={this.close} mask={isMask}>
        <div style={{padding: 20}}>
          <h2>遮罩用法</h2>
          <p>这是抽屉内容</p>
        </div>
      </Drawer>
      <div style={{marginBottom: 10}}>
        <RadioGroup value={isMask} onChange={this.maskOnChange}>
          <Radio value={true}>使用遮罩</Radio>
          <Radio value={false}>不使用遮罩</Radio>
        </RadioGroup>
      </div>
      <Button type="primary" onClick={this.toggleOpen}>切换打开抽屉</Button>
    </div>
  }
}
ReactDOM.render(
    <Demo />
, MOUNT_NODE);
```
