import cn from 'classnames';
import React from 'react';
export default function(props) {
  const { prefixCls, content, visible } = props;
  return (<div className={cn(`${prefixCls}-notice`, {[`${prefixCls}-notice-hidden`]: !visible})}>
    <div className={ `${prefixCls}-notice-content` }>
      { content }
    </div>
  </div>)
}
