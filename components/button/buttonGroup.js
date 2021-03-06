import React from 'react';
import cn from 'classnames';
import s from './style';

export default function ButtonGroup(props) {
  const { prefixCls = `${s.btnPrefix}-group`, size = '', className, ...others } = props;
  // large => lg
  // small => sm
  let sizeCls = '';
  switch (size) {
    case 'large':
      sizeCls = 'lg';
      break;
    case 'small':
      sizeCls = 'sm';
      break;
    default:
      break;
  }

  const classes = cn(prefixCls, {
    [`${prefixCls}-${sizeCls}`]: sizeCls,
  }, className);

  return <div {...others} className={classes} />;
}
