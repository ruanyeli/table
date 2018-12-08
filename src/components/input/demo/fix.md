---
order: 4
title:
  zh-CN: 前缀／后缀
  en-US: Type
desc:
  zh-CN: 在输入框上添加前缀或后缀图标。
  en-US: Type
---

## zh-CN

## en-US

```jsx
import { Input, Icon } from 'td-ui';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }
  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ userName: '' });
  }
  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value });
  }

  saveRef = node => this.userNameInput = node

  render() {
    const { userName } = this.state;
    const suffix = userName ? <Icon style={{ color: 'rgba(0,0,0,.25)', fontSize: 12 }} type="cross-circle" onClick={this.emitEmpty} /> : null;
    return (
      <Input
        placeholder="Enter your username"
        prefix={<Icon type="foreach" />}
        suffix={suffix}
        value={userName}
        onChange={this.onChangeUserName}
        ref={this.saveRef}
      />
    );
  }
}
ReactDOM.render(
  <div>
    <div style={{ marginBottom: 16, width: 300 }}>
      <Input prefix={<Icon type="search" />} placeholder='请输入查找内容' />
    </div>
    <div style={{ marginBottom: 16, width: 300 }}>
      <Input suffix={<Icon type="setting" />} placeholder='设置内容' />
    </div>
    <div style={{ marginBottom: 16, width: 300 }}>
      <App />
    </div>
  </div>,
  mountNode
);

```
