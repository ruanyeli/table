import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import omit from 'lodash/omit';
import s from './style';
import is from '../util/is';
import Icon from '../icon';
import Group from './buttonGroup';

const TWO_CN_REX = /^[\u4e00-\u9fa5]{2}$/;

// 如果是两个中文字符，则在中间插入一个空格
function insertSpace(child, needInserted) {
  if (is.nil(child)) {
    return null;
  }
  const SPACE = needInserted ? ' ' : '';
  if (!is.String(child) && !is.Number(child) && is.String(child.type)
   && TWO_CN_REX.test(child.props.children)) {
    return React.cloneElement(
      child,
      {},
      child.props.children.split('').join(SPACE),
    );
  }
  if (is.String(child)) {
    if (TWO_CN_REX.test(child)) {
      child = child.split('').join(SPACE);
    }
    return <span>{child}</span>;
  }
  return child;
}

export default class Button extends Component {
  static Group = Group

  static defaultProps = {
    clicked: false,
    prefixCls: s.btnPrefix,
    loading: false,
    className: '',
    htmlType: 'button',
    size: 'default',
    style: {},
  }

  static propTypes = {
    className: PropTypes.string,
    clicked: PropTypes.bool,
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    onClick: PropTypes.func,
    prefixCls: PropTypes.string,
    size: PropTypes.oneOf(['large', 'default', 'small']),
    style: PropTypes.object,
    type: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: !!props.loading,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('loading' in nextProps) {
      this.setState({
        loading: !!nextProps.loading,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleClick = (e) => {
    const { loading } = this.state;
    if (!loading) {
      this.setState({ clicked: true });
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.setState({ clicked: false }), 500);

      const { onClick } = this.props;
      if (onClick) {
        onClick(e);
      }
    } else {
      e.preventDefault();
    }
  }

  handleMouseUp = (e) => {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e);
    }
  }

  render() {
    const {
      type, size = '', className, style, htmlType = 'button', children, icon, prefixCls, ...others
    } = this.props;

    const { loading, clicked } = this.state;

    // large => lg
    // small => sm
    let sizeCls = '';
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
        break;
      default:
        break;
    }

    const st = Object.assign({}, style);
    const classNames = cn(prefixCls, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-clicked`]: clicked,
    }, className);

    const iconType = loading ? 'loading' : icon;
    const iconNode = iconType ? <Icon type={iconType} /> : null;
    const needInserted = React.Children.count(children) === 1;
    const kids = React.Children.map(children, child => insertSpace(child, needInserted));
    return (
      <button
        {...omit(others, ['loading', 'clicked'])}
        type={htmlType || 'button'}
        className={classNames}
        style={st}
        onMouseUp={this.handleMouseUp}
        onClick={this.handleClick}
      >
        {iconNode}
        {kids}
      </button>
    );
  }
}
