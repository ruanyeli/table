---
order: 5
title:
  zh-CN: 动态加载选项
  en-US: Type
desc:
  zh-CN: 使用 loadData 实现动态加载选项。
  en-US: Type
---

## zh-CN


## en-US


```jsx
import { Cascader } from 'td-ui';

const options = [{
  value: 'zhejiang',
  label: '浙江',
  isLeaf: false,
}, {
  value: 'jiangsu',
  label: '江苏',
  isLeaf: false,
}];

class LazyOptions extends React.Component {
  state = {
    inputValue: '',
    options,
  };
  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    this.setState({
      inputValue: selectedOptions.map(o => o.label).join(', '),
    });
  }
  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [{
        label: `${targetOption.label} Dynamic 1`,
        value: 'dynamic1',
      }, {
        label: `${targetOption.label} Dynamic 2`,
        value: 'dynamic2',
      }];
      this.setState({
        options: [...this.state.options],
      });
    }, 1000);
  }
  render() {
    return (
      <Cascader
        options={this.state.options}
        loadData={this.loadData}
        onChange={this.onChange}
        changeOnSelect
      />
    );
  }
}

ReactDOM.render(
  <div>
    <LazyOptions />
  </div>
, mountNode);
```
<style>
.td-btn {
  margin: 5px;
}
</style>
