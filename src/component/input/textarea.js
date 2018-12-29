import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import omit from 'lodash/omit';
import s from './style';
import calculateNodeHeight from './calculateNodeHeight';

function onNextFrame(cb) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(cb);
  }
  return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId) {
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(nextFrameId);
  } else {
    window.clearTimeout(nextFrameId);
  }
}

export default class Textarea extends Component {
  static defaultProps = {
    disabled: false,
    prefixCls: s.inputPrefix,
    placeholder: '',
    autoSize: false
  }

  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    onKeyDown: PropTypes.func,
    onPressEnter: PropTypes.func,
    placeholder: PropTypes.string,
    autoSize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
  }
  constructor(props) {
    super(props);
    this.state = {
      textareaStyle: null
    }
  }
  componentDidMount() {
    this.resizeTextarea();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      if (this.nextFrameActionId) {
        clearNextFrameAction(this.nextFrameActionId);
      }
      this.nextFrameActionId = onNextFrame(this.resizeTextarea);
    }
  }
  handleKeyDown = e => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  }
  handleTextareaChange = e => {
    if (!('value' in this.props)) {
      this.resizeTextarea();
    }
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
  }
  resizeTextarea = () => {
    const { autoSize } = this.props;
    if (!autoSize || !this.textAreaRef) {
      return;
    }
    // let rows = this.state.rows;
    let minRows = autoSize && typeof autoSize === 'object' ? autoSize.minRows : null;
    let maxRows = autoSize && typeof autoSize === 'object' ? autoSize.maxRows : null;
    // let scrollHeight = this.textAreaRef.scrollHeight;
    // let clientHeight = this.textAreaRef.clientHeight;
    // if (autoSize === true) {
    //   // this.loop(rows, scrollHeight, clientHeight, autoSize);
    // }
    // if (minRows) {
    //   rows = minRows;
    // }
    // if (maxRows) {
    //   this.loop(rows, scrollHeight, clientHeight, false, maxRows);
    // }
    const textareaStyle = calculateNodeHeight(this.textAreaRef, minRows, maxRows);
    this.setState({textareaStyle});
  }
  // loop = (rows, scrollHeight, clientHeight, autoSize, maxRows) => {
  //   if (scrollHeight > clientHeight && (rows < maxRows || autoSize)) {
  //     rows++;
  //     this.setState({rows}, () => {
  //       clientHeight = this.textAreaRef.clientHeight;
  //       this.loop(rows, scrollHeight, clientHeight, autoSize, maxRows);
  //     });
  //   }
  // }

  saveRef = node => this.textAreaRef = node;
  render() {
    const props = this.props;
    const { textareaStyle } = this.state;
    const { prefixCls, className, disabled } = props;
    const otherProps = omit(props, [
      'prefixCls',
      'onPressEnter',
      'autoSize'
    ]);
    const style = {
      ...props.style,
      ...textareaStyle
    };
    const classNames = cn(prefixCls, className, {
      [`${prefixCls}-disabled`]: disabled
    });
    if ('value' in otherProps) {
      otherProps.value = otherProps.value || '';
    }
    return (
      <textarea {...otherProps} onKeyDown={this.handleKeyDown}
        onChange={this.handleTextareaChange}
        style={style} className={classNames}
        ref={this.saveRef}
      />
    )
  }
}
