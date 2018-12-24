import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import shallowEqual from 'shallowequal';
import Checkbox from '../checkbox/tdcheckbox';
import s from './style';
// import { log } from 'util';

export default class Radio extends Component {
  static defaultProps = {
    className: '',
    defaultChecked: false,
    prefixCls: s.radioPrefix,
    style: {},
    type: 'radio',
  };

  static propTypes = {
    checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    className: PropTypes.string,
    defaultChecked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    prefixCls: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.string,
  };

  static contextTypes = {
    radioGroup: PropTypes.object,
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { props, state, context } = this;
    return !shallowEqual(props, nextProps)
    || !shallowEqual(state, nextState)
    || !shallowEqual(context.radioGroup, nextContext.radioGroup);
  }

  render() {
    const { props, context } = this;
    const { className, style, children, prefixCls, ...others } = props;

    const { radioGroup } = context;

    const radioPropTypes = { ...others };

    let verticalDirection = false;

    if (radioGroup) {
      radioPropTypes.onChange = radioGroup.onChange;
      radioPropTypes.disabled = radioPropTypes.disabled || radioGroup.disabled;
      radioPropTypes.checked = radioPropTypes.value === radioGroup.value;
      verticalDirection = radioGroup.direction === 'vertical';
    }

    const st = Object.assign({}, style);
    const classNames = cn(className, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: props.checked,
      [`${prefixCls}-wrapper-disabled`]: props.disabled,
      [`${prefixCls}-wrapper-vertical`]: verticalDirection,
    });
    // console.log('radioPropTypes', radioPropTypes);
    return (
      <label className={classNames} style={st}>
        <Checkbox {...radioPropTypes} prefixCls={prefixCls} />
        {children !== undefined ? 
          <span className={`${prefixCls}-text`}>{children}</span>
          : null
        }
      </label>
    );
  }
}
