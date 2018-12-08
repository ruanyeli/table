---
order: 3
title:
  zh-CN: 竖向步骤条
  en-US: Type
desc:
  zh-CN: 通过设置 Steps.Step 的 icon 属性，可以启用自定义图标。
  en-US: Type
---

## zh-CN

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Button, Steps, Icon } from 'td-ui';

const Step = Steps.Step;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    }
  }

  render() {
    return <div>
      <Steps current={this.state.current} mode="vertical">
        <Step title="步骤1" desc="这个是步骤1步骤1步骤1" icon="down"></Step>
        <Step title="步骤2" desc="这个是步骤2步骤2步骤2" icon={<Icon type="accessory" />}></Step>
        <Step title="步骤3" desc="这个是步骤3步骤3步骤3" icon="down"></Step>
      </Steps>
      <div style={{marginTop: 20}}>
        <Button style={{marginRight: 10, display: this.state.current < 2 ? 'inline-block' : 'none'}} onClick={() => {
          this.setState({
            current: this.state.current + 1
          })
        }}>下一步</Button>
        <Button style={{marginRight: 10, display: this.state.current > 0 ? 'inline-block' : 'none'}} onClick={() => {
          this.setState({
            current: this.state.current - 1
          })
        }}>上一步</Button>
      </div>
    </div>
  }
}

ReactDOM.render(<Demo />, mountNode);
```
