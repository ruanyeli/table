import React from 'react';
import PropTypes from 'prop-types';
import RcRate from 'rc-rate';
import Icon from '../icon';
import './style';

export default class Grade extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    character: PropTypes.node,
  };

  static defaultProps = {
    prefixCls: 'td-grade',
    character: <Icon type="like" />,
  };

  focus = () => {
    this.rcRate.focus();
  };

  blur = () => {
    this.rcRate.blur();
  };

  saveRate = node => {
    this.rcRate = node;
  };

  render() {
    return <RcRate ref={this.saveRate} {...this.props} />;
  }
}
