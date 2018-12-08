---
order: 4
title:
  zh-CN: RadioGroup 组合 - 配置方式
  en-US: RadioGroup group - optional
---

## zh-CN

通过配置 `options` 参数来渲染单选框。

## en-US

Render radios by configuring `options`.

```jsx
import { Radio } from 'td-ui';
const RadioGroup = Radio.RadioGroup;

const radioOptions1 = ["Tom","Sham","Jack","Mac"];
const radioOptions2 = [
    {label:"Tom",value:"Tom"},
    {label:"Sham",value:"Sham",disabled:true},
    {label:"Jack",value:"Jack"},
    {label:"Mac",value:"Mac"}
  ];


class App extends React.Component {
  onChange1 = (e) => {
    console.log('radio1 checked', e.target.value);
  }
  onChange2 = (e) => {
    console.log('radio2 checked', e.target.value);
  }
  render() {
    return (
      <div>
        <div>
          <RadioGroup value="Tom" options={radioOptions1} onChange={this.onChange1}/>
        </div>
        <div>
          <RadioGroup value="Mac" options={radioOptions2} onChange={this.onChange2}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
