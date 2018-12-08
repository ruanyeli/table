---
order: 0
title:
  zh-CN: 基本用法
  en-US: basic usage
desc:
  zh-CN: 基本使用。捕获异常
  en-US: basic pagination
---

## zh-CN

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { ErrorCatch } from 'td-ui';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleClick = () => {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }

  render() {
    if (this.state.counter === 5) {
      throw new Error('I crashed!'); 
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

const ErrorCatchDemo = ErrorCatch()(Demo);

ReactDOM.render(<ErrorCatchDemo />, mountNode);
```
