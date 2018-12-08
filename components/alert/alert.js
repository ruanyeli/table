import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import Icon from '../icon';
import classNames from 'classnames';
import s from './style';

export default class Sort extends Component {
  static defaultProps = {
    prefixCls: s.alertPrefix,
    valve: [],
    sortHandle: 'item'
  }

  static propTypes = {
    type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
    closable: PropTypes.bool,
    closeText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onClose: PropTypes.func,
    showIcon: PropTypes.bool,
    className: PropTypes.string,
    banner: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      closing: true,
      closed: false
    };
  }

  handleClose = (e) => {
    e.preventDefault();
    let dom = ReactDOM.findDOMNode(this);
    dom.style.height = `${dom.offsetHeight}px`;
    dom.style.height = `${dom.offsetHeight}px`;
    this.setState({
      closing: false
    });
    (this.props.onClose || noop)(e);
  }

  animationEnd = () => {
    this.setState({
      closed: true,
      closing: true
    });
  }

  render() {
    let {
      closable, description, type, prefixCls, message, closeText, showIcon, banner,
      className = '', style
    } = this.props;

    // banner模式默认有 Icon
    showIcon = banner && showIcon === undefined ? true : showIcon;
    // banner模式默认为警告
    type = banner && type === undefined ? 'warning' : type || 'info';

    let iconType = '';
    switch (type) {
      case 'success':
        iconType = 'check-circle';
        break;
      case 'info':
        iconType = 'info-circle';
        break;
      case 'error':
        iconType = 'cross-circle';
        break;
      case 'warning':
        iconType = 'exclamation-circle';
        break;
      default:
        iconType = 'default';
    }

    if (description) {
      iconType += '-o';
      if (type === 'error') {
        iconType = 'close-circle-o';
      }
    }

    let alertCls = classNames(prefixCls, {
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-close`]: !this.state.closing,
      [`${prefixCls}-with-description`]: !!description,
      [`${prefixCls}-no-icon`]: !showIcon,
      [`${prefixCls}-banner`]: !!banner
    }, className);

    if (closeText) {
      closable = true;
    }

    const closeIcon = closable ? (
      <a onClick={this.handleClose} className={`${prefixCls}-close-icon`}>
        {closeText || <Icon type="cross" />}
      </a>
    ) : null;

    return this.state.closed ? null : (
      <Animate
        component=""
        showProp="data-show"
        transitionName={`${prefixCls}-slide-up`}
        onEnd={this.animationEnd}
      >
        <div data-show={this.state.closing} className={alertCls} style={style}>
          {showIcon ? <Icon className={`${prefixCls}-icon`} type={iconType} /> : null}
          <span className={`${prefixCls}-message`}>{message}</span>
          <span className={`${prefixCls}-description`}>{description}</span>
          {closeIcon}
        </div>
      </Animate>
    );
  }
}
