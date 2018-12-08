import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import { placements } from './placements';
import s from './style';

class Tooltip extends Component {
  static propTypes = {
    trigger: PropTypes.any,
    children: PropTypes.any,
    defaultVisible: PropTypes.bool,
    visible: PropTypes.bool,
    placement: PropTypes.string,
    transitionName: PropTypes.string,
    animation: PropTypes.any,
    onVisibleChange: PropTypes.func,
    afterVisibleChange: PropTypes.func,
    content: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func
    ]).isRequired,
    contentStyle: PropTypes.object,
    contentClassName: PropTypes.string,
    prefixCls: PropTypes.string,
    mouseEnterDelay: PropTypes.number,
    mouseLeaveDelay: PropTypes.number,
    getTooltipContainer: PropTypes.func,
    destroyTooltipOnHide: PropTypes.bool,
    align: PropTypes.object,
    arrowContent: PropTypes.any,
    maxHeight: PropTypes.number
  };

  static defaultProps = {
    prefixCls: s.tooltipPrefix,
    mouseEnterDelay: 0,
    destroyTooltipOnHide: false,
    mouseLeaveDelay: 0.1,
    align: {},
    placement: 'right',
    trigger: ['hover'],
    arrowContent: null,
    transitionName: 'zoom'
  };

  state = {
    childIsDisabledButton: false
  }

  getPopupElement = () => {
    const { arrowContent, content, prefixCls, maxHeight } = this.props;
    return ([
      <div className={`${prefixCls}-arrow`} key="arrow">
        {arrowContent}
      </div>,
      <div className={`${prefixCls}-inner`} key="content" style={{maxHeight: maxHeight? maxHeight: ''}}>
        {typeof content === 'function' ? content() : content}
      </div>
    ]);
  }

  getPopupDomNode() {
    return this.trigger.getPopupDomNode();
  }

  saveTriggerRef = trigger => this.trigger = trigger;

  /**
   * 当按钮为button且disabled时候，浏览器不会触发部分事件
   */
  checkChildIsDisabledButton = () => {
    if (this.trigger) {
      const child = ReactDOM.findDOMNode(this.trigger);
      const childIsDisabledButton = child.tagName === 'BUTTON' && child.disabled;
      if (this.state.childIsDisabledButton !== childIsDisabledButton) {
        this.setState({childIsDisabledButton})
      }
    }
  }

  componentDidMount() {
    this.checkChildIsDisabledButton();
  }
  
  componentDidUpdate() {
    this.checkChildIsDisabledButton();
  }

  render() {
    const {
      contentClassName, trigger,
      mouseEnterDelay, mouseLeaveDelay,
      contentStyle, prefixCls,
      children, onVisibleChange, afterVisibleChange,
      transitionName, animation,
      placement, align,
      destroyTooltipOnHide,
      defaultVisible, getTooltipContainer,
      getPopupElement,
      ...restProps
    } = this.props;
    const extraProps = { ...restProps };
    if ('visible' in this.props) {
      extraProps.popupVisible = this.props.visible;
    }
    if (this.state.childIsDisabledButton) {
      extraProps.popupVisible = false;
    }
    return (<Trigger
      popupClassName={contentClassName}
      ref={this.saveTriggerRef}
      prefixCls={prefixCls}
      popup={getPopupElement || this.getPopupElement}
      action={trigger}
      builtinPlacements={placements}
      popupPlacement={placement}
      popupAlign={align}
      getPopupContainer={getTooltipContainer}
      onPopupVisibleChange={onVisibleChange}
      afterPopupVisibleChange={afterVisibleChange}
      popupTransitionName={transitionName}
      popupAnimation={animation}
      defaultPopupVisible={defaultVisible}
      destroyPopupOnHide={destroyTooltipOnHide}
      mouseLeaveDelay={mouseLeaveDelay}
      popupStyle={contentStyle}
      mouseEnterDelay={mouseEnterDelay}
      {...extraProps}
    >
      {children}
    </Trigger>);
  }
}

export default Tooltip;
