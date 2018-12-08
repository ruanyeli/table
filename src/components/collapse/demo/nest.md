---
order: 2
title:
  zh-CN: 面板嵌套
  en-US: Accordion
desc:
  zh-CN: 嵌套折叠面板。
  en-US: basic usage description
---

## zh-CN


## en-US

Accordion mode, only one panel can be expanded at a time. The first panel will be expanded by default.

```jsx
import { Collapse, Button } from 'td-ui';
const Panel = Collapse.Panel;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function random() {
  return parseInt(Math.random() * 10, 10) + 1;
}

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    ['onChange', 'setActivityKey', 'reRender', 'toggle'].map(fn => this[fn] = this[fn].bind(this));
  }
  getInitialState() {
    return {
      time: random(),
      accordion: false,
      activeKey: ['4'],
    };
  }
  onChange(activeKey) {
    this.setState({
      activeKey,
    });
  }
  getItems() {
    const items = [];
    for (let i = 0, len = 3; i < len; i++) {
      const key = i + 1;
      items.push(
        <Panel header={`This is panel header ${key}`} key={key} showArrow={false}>
          <p>{text.repeat(this.state.time)}</p>
        </Panel>
      );
    }
    items.push(
      <Panel header={`This is panel header 4`} key="4">
        <Collapse defaultActiveKey="1">
          <Panel header={`This is panel nest panel`} key="1">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </Panel>
    );
    return items;
  }

  setActivityKey() {
    this.setState({
      activeKey: ['2'],
    });
  }

  reRender() {
    this.setState({
      time: random(),
    });
  }

  toggle() {
    this.setState({
      accordion: !this.state.accordion
    });
  }

  render() {
    const accordion = this.state.accordion;
    const btn = accordion ? 'accordion' : 'collapse';
    const activeKey = this.state.activeKey;
    return (<div style={{ margin: 20, width: 400 }}>
      <Button onClick={this.reRender}>reRender</Button>
      <Button onClick={this.toggle}>{btn}</Button>
      <br/><br/>
      <Button onClick={this.setActivityKey}>active header 2</Button>
      <br/><br/>
      <Collapse
        accordion={accordion}
        onChange={this.onChange}
        activeKey={activeKey}
      >
        {this.getItems()}
      </Collapse>
    </div>);
  }
}
ReactDOM.render(<Test/>, mountNode);
```
