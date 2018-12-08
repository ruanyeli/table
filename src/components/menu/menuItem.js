import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import s from './style';

export default class MenuItem extends React.Component {
  static defaultProps = {
    prefixCls: s.menuPrefix,
    title: '',
    children: '',
    className: ''
  }

  static propTypes = {
    prefixCls: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    className: PropTypes.string
  }

  itemClick = e => {
    // e.nativeEvent.stopImmediatePropagation();
    const { eventKey, disabled, onClick } = this.props;
    const { selectedKeys, multiple } = this.props;
    if (disabled) {
      return
    }
    if (onClick) {
      const info = {
        key: eventKey,
        keyPath: [eventKey],
        item: this,
        domEvent: e
      };
      onClick(info)
    }
    let backSelected = [].concat(selectedKeys);
    const index = selectedKeys.indexOf(eventKey);
    if (multiple) {
      if (index >= 0) {
        backSelected.splice(index, 1);
      } else {
        backSelected = backSelected.concat([eventKey]);
      }
      this.props.onSelect(backSelected);
    } else {
      if (index < 0) {
        backSelected = [eventKey];
        this.props.onSelect(backSelected);
      }
    }
  }

  render() {
    const { prefixCls, children, level, selectedKeys, eventKey, mode, disabled, className, title = '' } = this.props;
    let style = {};
    if (mode === 'inline') {
      style = {
        paddingLeft: level * 24
      }
    }
    const clsssName = classnames(`${prefixCls}-item`, className, {
      [`${prefixCls}-item-selected`]: selectedKeys.indexOf(eventKey) >= 0,
      [`${prefixCls}-item-disabled`]: disabled
    });
    return (
      <li
        className={clsssName}
        style={style}
        onClick={this.itemClick}
        title={title}
      >
        { children }
      </li>
    );
  }
}
