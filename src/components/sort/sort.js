import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './style';

export default class Sort extends Component {
  static defaultProps = {
    prefixCls: s.sortPrefix,
    valve: [],
    sortHandle: 'item',
    direction: 'vertical'
  }

  static propTypes = {
    value: PropTypes.array,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    sortHandle: PropTypes.string
  }

  constructor(props) {
    super(props);
    let value = [];
    if ('value' in props) {
      value = props.value || this.getValue(props);
    } else {
      value = props.defaultValue || this.getValue(props);
    }

    this.state = {
      value,
      dragging: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value || []
      })
    } else {
      this.setState({
        value: this.getValue(nextProps)
      })
    }
  }

  onChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    } else {
      this.setState({
        value
      });
    }
  }

  getValue = props => {
    return React.Children.map(props.children, child => child.props.sortData);
  }

  getChildren = () => {
    const { prefixCls, direction, children } = this.props;
    return React.Children.toArray(children).map((child, index) => {
      return React.cloneElement(child, {
        sortId: index,
        onSortItems: this.onChange,
        items: this.state.value,
        direction,
        className: `${child.props.className || ''} ${prefixCls}-${direction}`
      })
    })
  }

  render() {
    const { prefixCls, className, direction } = this.props;
    return (<div className={`${prefixCls} ${prefixCls}-${direction} ${className || ''}`}>
      {
        this.getChildren()
      }
    </div>)
  }
}
