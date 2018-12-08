---
order: 0
title:
  zh-CN: 自定义错误展示
  en-US: basic usage
desc:
  zh-CN: 
  en-US: basic pagination
---

## zh-CN

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { ErrorCatch, Icon } from 'td-ui';

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

class ErrorComponent extends React.Component {
    render() {
        const { error, errorInfo } = this.props;
        return <div style={{fontSize: 20, color: 'red'}}>
                出错啦<Icon type="close-circle-o" />
            </div>
    }
}

const ErrorCatchDemo = ErrorCatch(ErrorComponent)(Demo);

ReactDOM.render(<ErrorCatchDemo />, mountNode);
```
