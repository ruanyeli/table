/**
 * Created by can.yang on 2017-08-14
 */
import React from 'react';
import assign from 'object-assign';
import Icon from '../icon';
import Button from '../button';
import Tooltip from '../tooltip';
import s from './style/index';
import { LocaleReceiver } from "../locale-provider";

export default class Popconfirm extends React.Component {
  static defaultProps = {
    prefixCls: s.tooltipPrefix,
    placement: 'top'
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false
    }
  }

  onConfirm = () => {
    this.setState({
      visible: false
    })
    if ('onConfirm' in this.props) {
      this.props.onConfirm();
    }
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
    if ('onCancel' in this.props) {
      this.props.onCancel();
    }
  }

  getPopupElement = () => {
    const { arrowContent, content, prefixCls, okText, cancelText } = this.props;
    return <LocaleReceiver componentName="Popconfirm">
      {
        locale => <div className={`${prefixCls}-content`}>
          <div className={`${prefixCls}-arrow`} key="arrow">
            {arrowContent}
          </div>
          <div className={`${prefixCls}-inner`} key="inner">
            <div className={`${prefixCls}-inner-content`}>
              <Icon type="waring" /> {content || locale.content}
            </div>
            <div className={`${prefixCls}-inner-content-btn`}>
              <Button type="default" size="small" onClick={this.onCancel}>{cancelText || locale.cancelText}</Button>
              <Button type="primary" size="small" onClick={this.onConfirm}>{okText || locale.okText}</Button>
            </div>
          </div>
        </div>
      }
    </LocaleReceiver>
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }

  render() {
    const props = assign({}, this.props);
    delete props.title;
    delete props.visible;
    return (
      <Tooltip
        visible={this.state.visible}
        action="click"
        popup={this.getPopupElement}
        onVisibleChange={this.handleVisibleChange}
        content={""}
        {...props}
      />
    );
  }
}
