---
order: 2
title:
  zh-CN: 按钮尺寸
  en-US: Type
desc:
  zh-CN: 按钮有大、中、小三种尺寸
  en-US: Type
---

## zh-CN

通过设置 size 为 large small 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中。

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Button, Radio, Icon } from 'td-ui';

class ButtonSize extends React.Component {
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
        <Button type="primary" icon="download" size={size}>下载</Button>
        <Button type="primary" size={size}>搜索</Button>
        <br />
        <Button.Group size={size}>
          <Button type="primary">
            <Icon type="return" />Backward
          </Button>
          <Button type="primary">
            Forward<Icon type="enter" />
          </Button>
        </Button.Group>
      </div>
    );
  }
}

ReactDOM.render(<ButtonSize />, mountNode);
```
```css
<style>
.td-btn {
  margin: 5px;
}
.td-btn-group {
  margin: 5px;
}
</style>
```
