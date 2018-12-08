import React from 'react';
import Sort, { SortItem } from '../index';

export default class Basic extends React.Component {
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
        direction={'horizontal'}
      >
        {
          value.map((item, index) => <SortItem className="vertical" sortData={item} key={index}><div style={{border: '1px solid #eee', padding: 10}}>{item.title}</div></SortItem>)
        }
      </Sort>
    )
  }
}
