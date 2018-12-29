import React from 'react';
import Select from '../index';
import { loadavg } from 'os';
const Option = Select.Option;
let arr = [];
for (let i = 0; i < 1000; i++) {
  arr.push(i + '');
}
export default class IsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asyncArr: []
    }
  }
  componentDidMount () {
    let asyncArr = [];
    for (let i = 0; i < 40; i++) {
      asyncArr.push(i + '');
    }
    this.setState({ asyncArr });
  }
  handleChange = value => {
    this.setState({value});
  }
  pageChange = (page, pageSize) => {
    console.log('pageChange', page, pageSize);
    // const { asyncArr = [] } = this.state;
    // let tmpArr = this.state.asyncArr;
    // const len = asyncArr.length;
    // for (let i = len; i < len + 10; i++) {
    //   tmpArr.push(i + '');
    // }
    let tmpArr = [];
    const len = page * pageSize;
    // for (let i = 0; i < len; i++) {
    //   tmpArr.push(i + '');
    // }
    for (let i = len - pageSize; i < len; i++) {
      tmpArr.push(i + '');
    }
    console.log(tmpArr);
    
    this.setState({ asyncArr: tmpArr });
  }
  render() {
    const { value, asyncArr = [] } = this.state;
    // console.log('asyncArr', asyncArr);
    
    return (
      <div>
        {/* <Select placeholder='请选择' showSearch isPage={{visibleCount: 30}} style={{ width: 120 }} defaultValue={value} size='small'>
          {
            arr.map((item, index) => <Option value={item} key={item}>{item}条／页</Option>)
          }
        </Select> */}
        <Select
          placeholder='异步加载'
          showSearch
          style={{ width: 120 }}
          defaultValue={value}
          size='small'
          pagination={{
            total: 40,
            defaultCurrent: 3,
            // current: 3,
            // onChange: this.pageChange,
            pageSize: 12
          }}
        >
          {
            asyncArr.map((item, index) => <Option value={item} key={item}>{item}条／页</Option>)
          }
        </Select>
      </div>
    )
  }
}
