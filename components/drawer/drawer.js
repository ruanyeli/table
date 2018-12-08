import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './style';
import cn from 'classnames';
import Animate from 'rc-animate';
import LazyRenderBox from '../dialog/lazyRenderBox';

function noop() {};

export default class Drawer extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    mask: PropTypes.bool,
    placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    onClose: PropTypes.func,
    drawerStyle: PropTypes.object,
    drawerClassName: PropTypes.string
  }
  static defaultProps = {
    prefixCls: s.drawerPrefix,
    width: 200,
    height: 200,
    isOpen: false,
    mask: true,
    placement: 'right',
    onClose: noop,
    drawerStyle: {},
    drawerClassName: ''
  }

  maskClick = () => {
    this.props.onClose();
  }

  getMaskComponent = () => {
    const { isOpen, prefixCls } = this.props;
    return (
      <Animate
        key="mask"
        showProp="visible"
        component=""
        transitionName="fade"
        transitionAppear
      >
        <LazyRenderBox onClick={this.maskClick} className={`${prefixCls}-mask`} hiddenClassName={`${prefixCls}-mask-hidden`} visible={isOpen}/>
      </Animate>
    )
  }

  getDrawerStyle = () => {
    const { placement, width, isOpen, height, drawerStyle } = this.props;
    let style;
    if (placement === 'left' || placement === 'right') {
      const translate = placement === 'left' ? `-${width}px` : `${width}px`;
      style = {
        transform: `translate(${isOpen ? 0 : translate}, 0)`,
        top: 0,
        width,
        height: '100%'
      }
      if (placement === 'left') {
        style.left = 0;
      } else {
        style.right = 0;
      }
    } else {
      const translate = placement === 'top' ? `-${height}px` : `${height}px`;
      style = {
        transform: `translate(0, ${isOpen ? 0 : translate})`,
        left: 0,
        width: '100%',
        height
      }
      if (placement === 'top') {
        style.top = 0;
      } else {
        style.bottom = 0;
      }
    }
    return Object.assign(style, drawerStyle);
  }

  getDrawerComponent = () => {
    const { prefixCls, drawerClassName, isOpen } = this.props;
    const style = this.getDrawerStyle();
    const className = cn({
      [`${prefixCls}-wrap`]: true,
      [`${prefixCls}-shadow`]: isOpen,
      [drawerClassName]: true
    })
    return <div className={className} style={style}>
      {this.props.children}
    </div>
  }

  getContainer = () => {
    const { container } = this.props;
    if (container) {
      return container;
    }
    return document.body;
  }

  render() {
    const { prefixCls, mask } = this.props;
    return createPortal(<div className={prefixCls}>
      {mask && this.getMaskComponent()}
      {this.getDrawerComponent()}
    </div>, this.getContainer());
  }
}
