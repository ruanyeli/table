/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Select from '../select';
// import { LocaleReceiver } from "../locale-provider";
const Option = Select.Option;

class Options extends Component {
  onChange = value => {
    this.props.onShowSizeChange(parseInt(value));
  }
  renderMain = (locale) => {
    const { prefixCls, pageSizeOptions, size, pageSize } = this.props;
    return (
      <div className={prefixCls}>
        <Select value={pageSize.toString() || pageSizeOptions[0]} size={size} onChange={this.onChange}>
          {
            pageSizeOptions.map((item, index) => <Option value={item} key={index}>{item}{locale.pagesize}</Option>)
          }
        </Select>
      </div>
    )
  }
  render() {
    return this.renderMain
  }
}

export default Options;
