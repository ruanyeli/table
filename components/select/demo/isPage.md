---
order: 3
title:
  zh-CN: 分页
  en-US: basic usage
desc:

  zh-CN: 选项已经全部加载完成，只进行分页选择
  en-US: basic pagination
---

## zh-CN

如果有大量选项时，可以采用分页的方式，提升页面性能

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Select } from 'td-ui';
const Option = Select.Option;
let arr = [];
for (let i = 0; i < 1000; i++) {
  arr.push(i + '');
}
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '3',
    }
  }
  handleChange = value => {
    this.setState({value});
  }
  render() {
    const { value } = this.state;
    return (
      <div>
        <Select placeholder='请选择' showSearch isPage={{visibleCount: 30}} style={{ width: 120 }} defaultValue={value} size='small'>
          {
            arr.map((item, index) => <Option value={item} key={item}>{item}条／页</Option>)
          }
        </Select>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
