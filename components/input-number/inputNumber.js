/**
 * @Author: ginalu <ljq>
 * @Date:   2017-05-24 15:04:30
 * @Last modified by:   ljq
 * @Last modified time: 2017-06-01 15:04:33
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../input';
import cn from 'classnames';
import omit from 'lodash/omit';
import assign from 'object-assign';
import s from './style';
import Icon from '../icon';

function noop(){}

export default class InputNumber extends Component {
  static defaultProps = {
    prefixCls: s.inputNumberPrefix,
    type: 'text',
    placeholder: '',
    btnType: 'vertical'
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    btnType: PropTypes.oneOf(['vertical', 'crosswise']),
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
    focused: PropTypes.bool,
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  };

  constructor(props) {
    super(props);
    let value = '';
    if (props.value !== null && props.value !== undefined) {
      value = props.value;
    } else if (props.defaultValue !== null && props.defaultValue !== undefined) {
      value = props.defaultValue;
    }
    this.state = {
      value,
      focused: props.focused,
      inputValue: value
    };
  }

  componentWillReceiveProps(nextProps) {
    const props = {};
    if ('value' in nextProps) {
      props.value = nextProps.value;
      props.inputValue = nextProps.value;
    }
    this.setState(props);
  }

  onFocus = () => {
    this.setState({ focused: true });
    this.input.focus();
  }

  onChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  propsOnChange = v => {
    if ('onChange' in this.props) {
      this.props.onChange(v);
    }
  }

  onBlur = (e, ...args) => {
    this.setState({ focused: false });
    const val = Number(e.target.value);
    let setInitValue = false;
    if (('min' in this.props) && val < this.props.min) {
      setInitValue = true;
    }
    if (('max' in this.props) && val > this.props.max) {
      setInitValue = true;
    }
    if (!isNaN(val) && val !== null && !setInitValue) {
      const value = e.target.value ? Number(e.target.value) : '';
      this.setState({ inputValue: value, value}, () => {
        this.propsOnChange(value)
      });
    } else {
      this.setState({ inputValue: this.state.value }, () => {
        this.propsOnChange(this.state.value)
      });
    }
    if ('onBlur' in this.props) {
      this.props.onBlur(this.state.value, e);
    }
  }

  upfunc = () => {
    const { value } = this.state;
    const { min = 0, max = 0 } = this.props;
    const inputval = parseFloat(this.state.inputValue);
    const mult = this.formateStep(this.props.step);
    let newValue;
    if (typeof value !== 'number') {
      let minValue = Math.min(min, max);
      if (min > max) {
        minValue = min;
      }
      newValue = minValue;
    } else if (this.props.step) {
      newValue = (inputval * mult + this.props.step * mult) / mult;
    } else {
      newValue = inputval + 1;
    }
    this.onFocus();
    this.propsOnChange(newValue);
    if (!('value' in this.props)){
      this.setState({
        inputValue: newValue,
        value: newValue
      });
    }
  }

  downfunc = () => {
    const { value } = this.state;
    const { min = 0, max = 0 } = this.props;
    const inputval = Number(this.state.inputValue);
    const mult = this.formateStep(this.props.step);
    let newValue;
    if (typeof value !== 'number') {
      newValue = Math.max(min, max);
    } else if (this.props.step) {
      newValue = (inputval * mult - this.props.step * mult) / mult;
    } else {
      newValue = inputval - 1;
    }
    this.onFocus();
    this.propsOnChange(newValue);
    if (!('value' in this.props)){
      this.setState({
        inputValue: newValue,
        value: newValue
      });
    }
  }

  formateStep = (num) => {
    if (Math.floor(num) === num) {
      return 1;
    } else {
      let strfi = num + '';
      let dotPos = strfi.indexOf('.');
      let len = strfi.substr(dotPos + 1).length;
      let times = Math.pow(10, len);
      return times;
    }
  }

  formatWrapper = (num) => {
    if (this.props.formatter) {
      return this.props.formatter(num);
    }
    return num;
  }

  saveInputRef = n => this.input = n;

  render() {
    const props = this.props;
    const { prefixCls, disabled, focused, icon } = props;
    const classes = cn({
      [prefixCls]: true,
      [props.className]: !!props.className,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-focused`]: focused,
      [`${prefixCls}-sm`]: props.size === 'small',
      [`${prefixCls}-lg`]: props.size === 'large'
    });
    const btnclasses = cn({
      [`${prefixCls}-handler-wrap`]: props.btnType === 'vertical',
      [`${prefixCls}-handler-wrap-cw`]: props.btnType === 'crosswise'
    });
    let upDisabledClass = ''
    let downDisabledClass = '';
    const { value } = this.state;
    if (!isNaN(value) && value !== '') {
      const val = Number(value);
      if ((val >= props.max || (val + props.step) > props.max) || props.disabled) {
        upDisabledClass = `${prefixCls}-handler-up-disabled`;
      }
      if (val <= props.min || (val - props.step) < props.min || props.disabled) {
        downDisabledClass = `${prefixCls}-handler-down-disabled`;
      }
    } else {
      // upDisabledClass = `${prefixCls}-handler-up-disabled`;
      // downDisabledClass = `${prefixCls}-handler-down-disabled`;
    }

    const isUpDisabled = !!upDisabledClass || disabled;
    const isDownDisabled = !!downDisabledClass || disabled;
    // 控制点击事件
    const editable = !props.readOnly && !props.disabled;

    const otherProps = omit(assign({}, props), ['prefixCls', 'value', 'btnType', 'style']);
    if ('value' in props) {
      otherProps.value = props.value;
    }
    delete otherProps.defaultValue;
    let inputDisplayValue;
    if (this.state.focused) {
      inputDisplayValue = this.state.inputValue;
    } else {
      inputDisplayValue = this.state.value;
    }

    if (inputDisplayValue === undefined || inputDisplayValue === null) {
      inputDisplayValue = '';
    }
    const inputDisplayValueFormat = this.formatWrapper(inputDisplayValue);

    return (
      <div className={classes} style={props.style}>
        <div className={`${btnclasses}`}>
          <button
            disabled={isUpDisabled}
            className={`${prefixCls}-handler ${prefixCls}-handler-up ${upDisabledClass}`}
            onClick={(editable && !upDisabledClass) ? this.upfunc.bind(this) : noop}
          >
            <Icon type='packup' />
          </button>
          <button
            disabled={isDownDisabled}
            className={`${prefixCls}-handler ${prefixCls}-handler-down ${downDisabledClass}`}
            onClick={(editable && !downDisabledClass) ? this.downfunc.bind(this) : noop}
          >
            <Icon type='unfold' />
          </button>
        </div>
        {
          props.type ? <Input {...otherProps}
            ref={this.saveInputRef}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            value={inputDisplayValueFormat}
            onChange={this.onChange}
          /> : props.children
        }
      </div>
    );
  }
}
