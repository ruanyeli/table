---
order: 2
title:
  zh-CN: 输入框尺寸
  en-US: Type
desc:
  zh-CN: 输入框有大、中、小三种尺寸
  en-US: Type
---

## zh-CN

通过设置 size 为 large small 分别把数字输入框设为大、小尺寸。高度分别为 34px、30px 和 24px。若不设置 size，则尺寸为中。

## en-US


```jsx
import { InputNumber, Radio } from 'td-ui';

class InputSize extends React.Component {
  state = {
    size: 'default',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const size = this.state.size;
    return (
      <div>
        <Radio.RadioGroup value={size} onChange={this.handleSizeChange}>
          <Radio.RadioButton value="large">Large</Radio.RadioButton>
          <Radio.RadioButton value="default">Default</Radio.RadioButton>
          <Radio.RadioButton value="small">Small</Radio.RadioButton>
        </Radio.RadioGroup>
        <br /><br />
        <InputNumber size={size} min={1} max={10} defaultValue={3} />
      </div>
    );
  }
}

ReactDOM.render(<InputSize />, mountNode);
```
