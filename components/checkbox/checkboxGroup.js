import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import shallowEqual from 'shallowequal';
import is from '../util/is';
import Checkbox from './checkbox';
import s from './style';

export default class CheckboxGroup extends React.Component {
  static defaultProps = {
    prefixCls: s.checkboxPrefix,
    className: '',
    style: {},
  };

  static propTypes = {
    className: PropTypes.string,
    defaultValue: PropTypes.array,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    options: PropTypes.array,
    style: PropTypes.object,
    value: PropTypes.array,
  };


  static childContextTypes = {
    checkboxGroup: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      checkboxValue: props.value || props.defaultValue || [],
    };
  }

  getChildContext() {
    return {
      checkboxGroup: {
        onChange: this.onCheckboxChange,
        disabled: this.props.disabled,
        value: this.state.checkboxValue,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        checked: nextProps.value || [],
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) { // 返回true则重新加载
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  onCheckboxChange = e => {
    const index = this.state.checkboxValue.indexOf(e.target.value);
    const newCheckboxValue = this.state.checkboxValue;
    if (index === -1) {
      newCheckboxValue.push(e.target.value);
    } else {
      newCheckboxValue.splice(index, 1);
    }
    this.setState({ checkboxValue: newCheckboxValue });
    const { onChange } = this.props;
    if (onChange) onChange(newCheckboxValue);
  }

  render() {
    const { props } = this; // 解构
    const { checkboxValue } = this.state; // 解构
    const { className, style, prefixCls, options, disabled } = props; // 解构

    let children = props.children;
    if (options && options.length > 0) {
      children = options.map((option, index) => {
        if (is.String(option)) {
          return (
            <Checkbox
              key={index}
              disabled={disabled}
              value={option}
              checked={checkboxValue.indexOf(option) > -1}
              onChange={this.onCheckboxChange}>
              {option}
            </Checkbox>
          );
        }
        if (is.Object(option)) {
          return (
            <Checkbox
              key={index}
              disabled={disabled}
              value={option}
              checked={checkboxValue.indexOf(option.value) > -1}
              onChange={this.onCheckboxChange}
            >
              {option.label}
            </Checkbox>
          );
        }
      });
    }

    const st = Object.assign({}, style); // 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
    const classNames = cn(className, {
      [`${prefixCls}-group`]: true
    });

    return (
      <div className={className} style={st}>
        {children}
      </div>
    );
  }
}
