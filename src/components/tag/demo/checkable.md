---
order: 3
title:
  zh-CN: 可选择
  en-US: checkable tag
desc:
  zh-CN: 可选择
  en-US: checkable tag
---

## zh-CN

可通过 `CheckableTag` 实现类似 `Checkbox` 的效果，点击切换选中效果。

## en-US

The `checkbox` effect can be realized via `CheckableTag`.It can be clicked to toggle the tag.

```jsx
import { Tag } from 'td-ui';
const { CheckableTag } = Tag;

class MyTag extends React.Component {
  state = { checked: true };
  handleChange = (checked) => {
    this.setState({ checked });
  }
  render() {
    return <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} />;
  }
}

ReactDOM.render(
  <div>
    <MyTag>Tag1</MyTag>
    <MyTag>Tag2</MyTag>
    <MyTag>Tag3</MyTag>
  </div>
, mountNode);

```