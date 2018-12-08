/**
 * @Author:  GinaLu <ljq>
 * @Date:   2017-05-16 14:49:49
 * @Last modified by:   ljq
 * @Last modified time: 2017-05-16 18:33:09
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './input';
import Icon from '../icon';

export default class Search extends Component {
  static propTypes = {
    onSearch: PropTypes.func,
    onPressEnter: PropTypes.func,
  }


  saveRef = node => this.input = node;

  onSearch = e => {
    const value = this.input && this.input.input && this.input.input.value;
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch(value);
    }
  }

  onPressEnter = e => {
    this.onSearch(e);
    const { onPressEnter } = this.props;
    if (onPressEnter) {
      onPressEnter(value);
    }
  }

  render() {
    const { onSearch, ref, suffix, onPressEnter,  ...nestProps  } = this.props;
    const searchSuffix = (<Icon type="search" onClick={this.onSearch} />);
    return (
      <Input
        {...nestProps}
        onPressEnter={this.onPressEnter}
        suffix={searchSuffix}
        ref={this.saveRef}
      />
    );
  }
}
