---
order: 3
title:
  zh-CN: 分页，异步加载选项
  en-US: basic usage
desc:
  zh-CN: 只加载部分部分选项，更多选项在翻页时加载。在这种模式下，需设置 pagination 属性，且设置 total 属性
  en-US: basic pagination
---

## zh-CN

异步加载更多选项


```jsx
import { Select } from 'td-ui';
const Option = Select.Option;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 110,
      asyncOption: [],
    }
  }
  componentDidMount () {
    let asyncOption = [];
    for (let i = 0; i < 20; i++) {
      asyncOption.push(i + '');
    }
    this.setState({ asyncOption });
  }

  pageChange = (page, pageSize) => {
    console.log('pageChange', page, pageSize);
    setTimeout(() => {
      const { total } = this.state;
      let tmpArr = [];
      const len = page * pageSize >= total ? total : page * pageSize;
      for (let i = (page - 1) * pageSize; i < len; i++) {
        tmpArr.push(i + '');
      }
      this.setState({ asyncOption: tmpArr });
    }, 1000);
  }

  handleSearch = (value) => {
    console.log('handleSearch', value);
    if (value) {
      const tmpArr = Array.from(Array(7), (item, index) => Array(index + 1).fill(value).join(''));
      this.setState({ 
        asyncOption: tmpArr,
        total: 7
      });
    }
  }

  render() {
    const { total, asyncOption } = this.state;
    return (
      <div>
        <Select
          placeholder='异步加载选项'
          showSearch
          onSearch={this.handleSearch}
          pagination={{
            total: total,
            pageSize: 20,
            onChange: this.pageChange,
          }}
          style={{ width: 180 }}
        >
          {
            asyncOption.map((item, index) => <Option value={item} key={item}>{item}条／页</Option>)
          }
        </Select>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
