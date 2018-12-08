/**
 * Created by kongliang on 05/07/2017.
 */
import React from 'react';
import assign from 'object-assign';
import Tooltip from '../tooltip';
import s from './style';

export default class Popover extends React.Component {
  static defaultProps = {
    prefixCls: s.popoverPrefix,
    placement: 'top'
  };

  getPopupElement = () => {
    const { arrowContent, title, content, prefixCls } = this.props;
    return ([
      <div className={`${prefixCls}-arrow`} key="arrow">
        {arrowContent}
      </div>,
      <div className={`${prefixCls}-inner`} key="inner">
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        <div className={`${prefixCls}-inner-content`}>
          {content}
        </div>
      </div>]
    )
  }

  render() {
    const props = assign({}, this.props);
    delete props.placement; //ui要求箭头只能向下，因为title的颜色不对
    delete props.title;
    return (
      <Tooltip
        placement="top"
        popup={this.getPopupElement}
        {...props}
      />
    );
  }
}
