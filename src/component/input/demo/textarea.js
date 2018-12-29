import React from 'react';
import Input from '../index';
const Textarea = Input.Textarea;

export default class Area extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '这是一段文字'
    }
  }
  onChange = e => {
    this.setState({value: e.target.value});
  }
  render() {
    const { value } = this.state;
    return (
      <div style={{padding: '50px', width: '400px'}}>
        <Textarea placeholder='请输入' autoSize value={value} onChange={this.onChange}/>
        <Textarea placeholder='请输入' defaultValue='这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字' autoSize={{minRows: 2, maxRows: 6}}/>
        <Textarea placeholder='请输入' rows={4}/>
      </div>
    )
  }
}
