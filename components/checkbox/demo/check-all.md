---
order: 4
title:
    zh-CN: 全选
    en-US: Check all
---

## zh-CN

在实现全选效果时，你可能会用到 `indeterminate` 属性。

## en-US

The `indeterminate` property can help you to achieve a 'check all' effect.

````jsx
import { Checkbox } from 'td-ui';
const CheckboxGroup = Checkbox.CheckboxGroup;

const plainOptions = [{label:"Tom",value:"Tom"},{label:"Sham",value:"Sham"},{label:"Jack",value:"Jack"},{label:"Mac",value:"Mac"}];
const defaultCheckedList = ["Tom","Sham"];

class App extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false
      };
    }
  render() {
    return (
      <div>
          <div style={{ borderBottom: '1px solid #E9E9E9' }}>
            <Checkbox
              indeterminate={this.state.indeterminate}
              onChange={this.onCheckAllChange}
              checked={this.state.checkAll}
            >
              Check all
            </Checkbox>
          </div>
          <CheckboxGroup value={this.state.checkedList} options={plainOptions} onChange={this.onChange}/>
      </div>
    );
  }
  onChange = (checkedList) => {
      this.setState({
        checkedList,
        indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
        checkAll: checkedList.length === plainOptions.length
      });
    }
    onCheckAllChange = (e) => {
      this.setState({
        checkedList: e.target.checked ? plainOptions.map((op)=>{return op.value}) : [],
        indeterminate: false,
        checkAll: e.target.checked
      });
    }
}

ReactDOM.render(<App />, mountNode);
````
