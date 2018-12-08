import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable no-unused-vars */
import Button from '../button';
/* eslint-disable no-unused-vars */
import Icon from '../icon';
import s from './style';
import LazyRenderBox from './lazyRenderBox';
import Animate from 'rc-animate';
import LocaleReceiver from '../locale-provider/LocaleReceiver'

function noop() {}
// let mousePosition = { x: 0, y: 0 };
// let mousePositionEventBinded = false;
const checkContain = componentDom => target => {
  let isSet = true;
  let dom = target.parentElement;
  while (dom) {
    if (componentDom == dom) {
      isSet = false;
      break;
    }
    dom = dom.parentElement;
  }
  return isSet;
}

export default class Dialog extends React.Component {
  static defaultProps = {
    afterClose: noop,
    prefixCls: s.dialogPrefix,
    width: 520,
    onOk: noop,
    onCancel: noop,
    maskClosable: true,
    closable: true,
    className: '',
    draggable: false,
    // isTransformOrigin: true
    confirmLoading: false,
  }

  static propTypes = {
    prefixCls: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    okText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    maskClosable: PropTypes.bool,
    draggable: PropTypes.bool,
    confirmLoading: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0
    }
    this.dialogDiv = null;
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
    this.move = false;
  }

  // componentDidMount() {
  //   if (mousePositionEventBinded) {
  //     return;
  //   }
  //   const checkContainFun = checkContain(this.componentDom);
  //   // 只有点击事件支持从鼠标位置动画展开
  //   document.documentElement.addEventListener('click', (e) => {
  //     mousePosition = {
  //       x: e.pageX,
  //       y: e.pageY,
  //     }
  //     // 100ms 内发生过点击事件，则从点击位置动画展示
  //     // 否则直接 zoom 展示
  //     // 这样可以兼容非点击方式展开
  //     setTimeout(() => mousePosition = {}, 100);
  //   });
  //   mousePositionEventBinded = true;
  // }

  maskClose = (e) => {
    if (e.target === e.currentTarget) {
      this.onCancel();
    }
  }

  changeDom = () => {
    if (this.dialogDiv) {
      const {x, y} = this.state;
      const { startX, startY, endX, endY } = this;
      this.dialogDiv.style.transform = `translate(${endX - startX + x}px, ${endY - startY + y}px)`
    }
  }

  mouseDown = (e) => {
    this.move = true;
    this.startX = this.endX = e.clientX;
    this.startY = this.endY = e.clientY;
  }

  mouseMove = (e) => {
    if (this.move) {
      this.endX = e.clientX;
      this.endY = e.clientY;
      this.changeDom();
    }
  }

  mouseUp = (e) => {
    if (this.move) {
      const {x, y} = this.state;
      const { startX, startY, endX, endY } = this;
      this.move = false;
      this.setState({
        x: endX - startX + x,
        y: endY - startY + y
      });
    }
  }

  renderHeader = () => {
    const { prefixCls, title, header, draggable } = this.props;
    if (header !== undefined && (header === null || header === '')) {
      return ''
    } else if (draggable) {
      return <div 
              className={`${prefixCls}-header ${prefixCls}-header-draggable`}
              onMouseDown={this.mouseDown}
              onMouseMove={this.mouseMove}
              onMouseUp={this.mouseUp}
            >{header || title}</div>
    } else {
      return <div className={`${prefixCls}-header`}>{header || title}</div>
    }
  }

  onCancel = () => {
    document.body.style.overflow = '';
    this.props.onCancel()
  }

  renderFooter = () => {
    const { prefixCls, footer, cancelText, okText, confirmLoading } = this.props;
    return footer === '' || footer === null ? '' : <div className={`${prefixCls}-footer`}>{footer || <LocaleReceiver componentName="Dialog">
      {
        local => [(
          <Button
            key="cancel"
            key="cancel"
            onClick={this.onCancel}
          >
            {cancelText || local.cancelText}
          </Button>
        ), (
            <Button
              type="primary"
              key="ok"
              onClick={() => this.props.onOk()}
              loading={confirmLoading}
            >
              {okText || local.okText}
            </Button>
          )]
      }
    </LocaleReceiver>}</div>
  }

  getMaskComponent = () => {
    const { visible, prefixCls } = this.props;
    return (
      <Animate
        key="mask"
        showProp="visible"
        component=""
        transitionName="fade"
        transitionAppear
      >
        <LazyRenderBox className={`${prefixCls}-mask`} hiddenClassName={`${prefixCls}-mask-hidden`} visible={visible}/>
      </Animate>
    )
  }

  saveDialogRef = dialogDiv => this.dialogDiv = dialogDiv;

  getDialog = () => {
    const { visible, prefixCls, children, width, maskClosable, closable, className, isTransformOrigin, style = {} } = this.props;
    const { x, y } = this.state;
    const innerStyle = {
      width,
      transform: `translate(${x}px, ${y}px)`,
      ...style
    }
    return (
      <Animate
        key="dialog-con"
        showProp="visible"
        component=""
        transitionName="zoom"
        transitionAppear
        onEnd={() => { this.props.afterClose() }}
      >
        <LazyRenderBox
          key="dialog-element"
          className={`${prefixCls}-wrap`}
          hiddenClassName={`${prefixCls}-wrap-hidden`}
          visible={visible}
          onClick={maskClosable ? this.maskClose : null}
          // style={isTransformOrigin ? {transformOrigin: `${mousePosition.x}px ${mousePosition.y}px 0`} : {}}
          >
          <div className={`${prefixCls} ${className}`} style={ innerStyle } ref={this.saveDialogRef}>
            <div className={`${prefixCls}-content`}>
              {closable ? <button className={`${prefixCls}-close`} onClick={() => this.onCancel()}><Icon type='cross'/></button> : ''}
              {this.renderHeader()}
              <div className={`${prefixCls}-body`}>
                {children}
              </div>
              {this.renderFooter()}
            </div>
          </div>
        </LazyRenderBox>
      </Animate>
    )
  }

  saveComponentDomRef = c => this.componentDom = c
  componentWillReceiveProps(nextProps) {
    const { visible } = this.props;
    if (nextProps.visible !== visible) {
      if (nextProps.visible) { // visible  变为 true
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }
  render = () => {
    // const { visible } = this.props;
    // if (visible) {
    //   document.body.style.overflow = 'hidden';
    // } else {
    //   document.body.style.overflow = '';
    // }
    // console.log("document", document.body);
    
    return <div ref={this.saveComponentDomRef}>
      {this.getMaskComponent()}
      {this.getDialog()}
    </div>;
  }
}
