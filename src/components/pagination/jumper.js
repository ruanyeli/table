/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { LocaleReceiver } from "../locale-provider";

class QuickJumper extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    allPages: PropTypes.number,
    current: PropTypes.number,
    onChange: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.current
    }
  }
  onChange = e => {
    this.setState({
      value: e.target.value
    })
  }
  onKeyUp = e => {
    let value = e.target.value;
    const { current, allPages } = this.props;
    const keyCode = e.keyCode;
    if (isNaN(value)) {
      value = current;
    } else if (value > allPages) {
      value = allPages;
    }
    if (value === '') {
      return;
    }
    if (keyCode === 13) {
      value = parseInt(value);
      this.setState({value});
      if (value !== current) {
        this.props.onChange(value);
      }
    }
  }
  renderMain = locale => {
    const { prefixCls } = this.props;
    const { value } = this.state;
    return (
      <div className={prefixCls}>
        {locale.jumper1}
        <input type='text' value={value} onChange={this.onChange} onKeyUp={this.onKeyUp}/>
        {locale.jumper2}
      </div>
    )
  }
  render() {
    return  this.renderMain
     
  }
}

export default QuickJumper;
