import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import shallowEqual from 'shallowequal';
import TDCheckbox from '../checkbox/tdcheckbox';
import s from './style';


export default class Radio extends React.Component {
  static PropTypes = {
    classnames: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.object,
    checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    defaultChecked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    value: PropTypes.number
  }

  static defaultProps = {
    prefixCls: s.radioPrefix,
    classnames: '',
    type: 'radio',
    style: {},
    defaultChecked: false,
    value: '',
    onChange() {
    }
  }

  constructor(props) {
    super(props);
    const checked = 'checked' in props ? props.checked : props.defaultChecked;
    this.state = {
      checked
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }

  handleChange = (e) => {
    const { props } = this;
    if (props.disabled) {
      return;
    }
    console.log('checked' in props);
    if (!('checked' in props)) {
      this.setState({
        checked: e.target.checked
      });
    } 
    this.props.onChange({
      target: {
        ...props,
        checked: e.target.checked
      },
      stopPropagation() {
        e.stopPropagation();
      },
      preventDefault() {
        e.preventDefault();
      }
    });
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(nextProps, this.props) || !shallowEqual(nextContext, this.context) || !shallowEqual(nextState, this.state);
  }

  render() {
    const { props } = this;
    const { prefixCls, type, className, style, checked, children, value } = props;

    const st = Object.assign({}, style);
    const classNames = cn(className, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-checked`]: props.checked,
    });
    return (
      <label>
        <input
          type={type}
          checked={props.checked}
          value={value}
          onChange={this.handleChange}
          // disabled={disabled}
        />
        {children !== undefined ? <span className={`${prefixCls}-text`}>{children}</span> : null}
      </label>
    );
  }
}
