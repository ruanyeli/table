---
order: 4
title:
  zh-CN: 加载状态
  en-US: Type
desc:
  zh-CN: 
  en-US: Type
---

## zh-CN

添加 `loading` 属性即可让按钮处于加载状态，添加 `loading` 属性即可让按钮处于加载状态。

```jsx
import { Button } from 'td-ui';

class App extends React.Component {
  state = {
    loading: false,
    iconLoading: false,
  }

  enterLoading = () => {
    this.setState({ loading: true });
  }

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  }

  render() {
    return (
      <span>
        <Button type="primary" loading>
          Loading
        </Button>
        <Button type="primary" size="small" loading>
          Loading
        </Button>
        <br />
        <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
          Click me!
        </Button>
        <Button type="primary" icon="logout" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
          Click me!
        </Button>
      </span>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
