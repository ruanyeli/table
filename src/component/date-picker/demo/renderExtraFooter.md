---
order: 4
title:
  zh-CN: 额外页脚
  en-US: Type
desc:
  zh-CN: 扩展页脚
  en-US: Type
---

## zh-CN

## en-US

```jsx
import { DatePicker } from 'td-ui';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;

class Demo extends React.Component {
  state = {
    value: [moment(), moment()]
  }
  onChange = value => {
    this.setState({value})
  }

  generateDateRange(offset) {
    const today = moment();
    const start = today.clone().hour(0).minute(0).second(0);
    const end = today.clone().hour(23).minute(59).second(59);
    let time;
    if (offset === 0) {
      time = [start, end];
    } else if (offset === 1) {
      time = [start.subtract(1, 'day'), end.subtract(1, 'day')];
    } else {
      time = [start.subtract(offset - 1, 'day'), end];
    }
    return time;
  }


  render() {
    const { value } = this.state;
    return <RangePicker value={value} format="YYYY-MM-DD HH:mm:ss" renderExtraFooter={(value) => {
      return <div className="font-12" style={{padding: '5px 10px'}}>
        <a style={{marginRight: 15}} onClick={() => this.onChange(this.generateDateRange(0))}>今天</a>
        <a style={{marginRight: 15}} onClick={() => this.onChange(this.generateDateRange(1))}>昨天</a>
        <a style={{marginRight: 15}} onClick={() => this.onChange(this.generateDateRange(7))}>最近一周</a>
        <a style={{marginRight: 15}} onClick={() => this.onChange(this.generateDateRange(30))}>最近一个月</a>
        <a style={{marginRight: 15}} onClick={() => this.onChange(this.generateDateRange(90))}>最近三个月</a>
      </div>
    }}/>
  }
}

ReactDOM.render(
  <Demo />,
  mountNode
);
```