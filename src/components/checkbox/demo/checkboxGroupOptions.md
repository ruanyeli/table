---
order: 3
title:
  zh-CN: CheckboxGroup 组合 - 配置方式
  en-US: CheckboxGroup group - optional
---

## zh-CN

通过配置 `options` 参数来渲染多选框。

## en-US

Render checkboxes by configuring `options`.

```jsx
import { Checkbox } from 'td-ui';
const CheckboxGroup = Checkbox.CheckboxGroup;

const checkboxOptions1 = ["Tom","Sham","Jack","Mac"];
const checkboxOptions2 = [
    {label:"Tom",value:"Tom"},
    {label:"Sham",value:"Sham",disabled:true},
    {label:"Jack",value:"Jack"},
    {label:"Mac",value:"Mac"}
];


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          value1:["Tom","Mac"],
          value2:["Mac"]
        };
    }

    onCheckboxGroupChange1 = v => {
      console.log(v);
      this.setState({value1:v})
    }
    onCheckboxGroupChange2 = v => {
      console.log(v);
      this.setState({value2:v})
    }
  render() {
    return (
      <div>
        <div>
          <CheckboxGroup value={this.state.value1} options={checkboxOptions1} onChange={this.onCheckboxGroupChange1}/>
        </div>
        <div>
          <CheckboxGroup value={this.state.value2} options={checkboxOptions2} onChange={this.onCheckboxGroupChange2}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
