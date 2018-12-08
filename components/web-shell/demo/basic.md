---
order: 0
title:
  zh-CN: 基本用法
  en-US: basic usage
desc:
  zh-CN: 基本
  en-US: basic pagination
---

## zh-CN

基本

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { WebShell } from 'td-ui';
import 'whatwg-fetch';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: null
    };

    fetch('http://10.57.17.240:8181/terminals', {method: 'POST'}).then(res => {
      res.text().then(pid => this.setState({ pid }));
    });
  }

  render() {
    if (!this.state.pid) {
      return null;
    }
    return (
      <WebShell socketURL={`ws://10.57.17.240:8181/terminals/${this.state.pid}`}/>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
