---
order: 2
title:
  zh-CN: 文案展现
  en-US: Show copywriting
---

## zh-CN

给评分组件加上文案展示。

## en-US

Add copywriting in rate components.

````jsx
import { Grade } from 'td-ui';

class Grader extends React.Component {
  state = {
    value: 3,
  }
  handleChange = (value) => {
    this.setState({ value });
  }
  render() {
    const { value } = this.state;
    return (
      <span>
        <Grade onChange={this.handleChange} value={value} />
        {value && <span className="ant-rate-text">{value} stars</span>}
      </span>
    );
  }
}

ReactDOM.render(<Grader />, mountNode);
````