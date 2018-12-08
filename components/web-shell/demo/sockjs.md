---
order: 1
title:
  zh-CN: 使用sockjs
  en-US: basic usage
desc:
  zh-CN: 使用sockjs
  en-US: basic pagination
---

## zh-CN

使用sockjs

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { WebShell } from 'td-ui';
import 'whatwg-fetch';
import Sockjs from 'sockjs-client';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: new Sockjs('http://10.57.17.240:8182/echo')
    }
  }

  render() {
    if (!this.state.socket) {
      return null;
    }
    return (
      <WebShell socket={this.state.socket} onOpen={() => {}}/>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
