---
order: 0
title:
  zh-CN: 基本用法
  en-US: basic usage
desc:
  zh-CN: 常规用法
  en-US: basic pagination
---

## zh-CN

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Sort } from 'td-ui';
const SortItem = Sort.SortItem;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [{
        title: 'xxxxx1'
      }, {
        title: 'xxxxx2'
      }, {
        title: 'xxxxx3'
      }, {
        title: 'xxxxx4'
      }, {
        title: 'xxxxx5'
      }]
    }
  }

  render() {
    const { value } = this.state;
    return (
      <Sort
        onChange={(value) => {
          console.log(value);
          this.setState({
            value
          });
        }}
        value={value}
      >
        {
          value.map((item, index) => <SortItem className="vertical" sortData={item} key={index}>
            <div>
              {item.title}
            </div>
          </SortItem>)
        }
      </Sort>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
